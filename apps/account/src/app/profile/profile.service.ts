import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from '@shared/models/profile';
import {
  CreateSocialProfileDto,
  UpdateSocialProfileDto,
  DeleteSocialProfileDto,
  UpdateExpProfileDto,
} from '@shared/dtos/account';
import {
  catchError,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { CacheManagerService, CacheMessageAction } from '@shared/cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProfileSocial } from 'shared/models/src/profile-social.model';
import { AccountAlert } from '@shared/alert/account';
import { HttpStatusCode } from 'axios';
import { throwException } from '@shared/exception';
import { ActionExpType } from '@shared/types';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);
  private readonly TTL_CACHE_TIME = 7 * 24 * 60 * 60;
  private readonly cacheRealmMetadataKey = 'REALM_METADATA';

  constructor(
    @InjectModel(Profile)
    private readonly profileModel: typeof Profile,
    @InjectModel(ProfileSocial)
    private readonly profileSocialModel: typeof ProfileSocial,
    private readonly cacheService: CacheManagerService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  handleGetDetailProfile(id: string) {
    const cacheKey = this.getCacheKey(id, 'ALL');
    return this.cacheService.get(cacheKey).pipe(
      mergeMap((existingData) => {
        if (existingData) {
          return of({ data: existingData });
        }

        return from(
          this.profileModel.findOne({
            where: {
              id,
            },
            attributes: ['id', 'totalExp'],
            include: [
              {
                association: 'realm',
                required: false,
                attributes: ['id', 'level', 'requireExp'],
              },
              {
                where: { profileId: id },
                association: 'profileSocials',
                required: false,
                attributes: ['status', 'id', 'link'],
                include: [
                  {
                    association: 'socials',
                    attributes: ['logo'],
                    required: false,
                  },
                ],
              },
              {
                where: { profileId: id },
                association: 'profileAchievements',
                required: false,
                attributes: ['id'],
                include: [
                  {
                    association: 'achievements',
                    attributes: ['logo', 'name'],
                    required: false,
                  },
                ],
              },
              {
                where: { profileId: id },
                association: 'profileMaterialArts',
                required: false,
                include: [
                  {
                    association: 'materialArts',
                    attributes: ['logo', 'name'],
                    required: false,
                  },
                ],
              },
            ],
          })
        ).pipe(
          tap((response) => {
            console.log('Response: ', response);
            this.logger.log('Get profile detail successfully!');
            const jsonData = response.toJSON();
            this.eventEmitter.emit(CacheMessageAction.Create, {
              key: cacheKey,
              value: jsonData,
              ttl: this.TTL_CACHE_TIME,
            });
          }),
          map((response) => {
            const jsonData = response.toJSON();
            return {
              data: jsonData,
            };
          })
        );
      })
    );
  }

  handleAddSocialProfile(body: CreateSocialProfileDto) {
    const { profileId, socialId, link } = body;
    return from(
      this.profileSocialModel.findOne({ where: { profileId, socialId } })
    ).pipe(
      catchError(() =>
        throwException(
          HttpStatusCode.InternalServerError,
          AccountAlert.ProfilePerformError
        )
      ),
      mergeMap((existingItem) => {
        if (existingItem) {
          return of({
            data: existingItem,
            message: AccountAlert.SocialProfileFailExisting,
          }); // Return existing item if found
        }
        return from(
          this.profileSocialModel.create({ profileId, socialId, link })
        ).pipe(
          map((response) => {
            const jsonData = response.toJSON();
            return {
              data: jsonData,
              message: AccountAlert.SocialProfileCreateSuccess,
            };
          })
        );
      })
    );
  }

  handleUpdateSocialProfile(body: UpdateSocialProfileDto) {
    const id = body.id;
    delete body.id;
    return from(
      this.profileSocialModel.update(body, {
        where: { id },
      })
    ).pipe(
      catchError(() =>
        throwException(
          HttpStatusCode.InternalServerError,
          AccountAlert.ProfilePerformError
        )
      ),
      map(() => {
        return {
          message: AccountAlert.SocialProfileUpdateSuccess,
        };
      })
    );
  }

  handleDeleteSocialProfile(body: DeleteSocialProfileDto) {
    const id = body.id;
    return from(
      this.profileSocialModel.destroy({
        where: { id },
      })
    ).pipe(
      catchError(() =>
        throwException(
          HttpStatusCode.InternalServerError,
          AccountAlert.ProfilePerformError
        )
      ),
      map(() => {
        return {
          message: AccountAlert.SocialProfileDeleteSuccess,
        };
      })
    );
  }

  handleUpdateStreak(id: string) {
    return from(
      this.profileModel.findByPk(id, {
        attributes: ['streak'],
        rejectOnEmpty: true,
      })
    ).pipe(
      mergeMap((data) => {
        data.streak++;
        return data.save();
      }),
      map((response) => ({ message: '' })),
      catchError(() =>
        throwException(
          HttpStatusCode.InternalServerError,
          AccountAlert.ProfilePerformError
        )
      )
    );
  }

  handleUpdateExp(body: UpdateExpProfileDto) {
    return forkJoin([
      this.handleGetDetailProfile(body.id),
      this.cacheService.get<Array<any>>(this.cacheRealmMetadataKey),
    ]).pipe(
      switchMap(([detailProfile, realmMetadata]) => {
        const earnExp = this.getExpForUserByActionType(body.actionType, 1);
        const currentExp = (detailProfile.data as any)?.totalExp;
        const nextLevel = (detailProfile.data as any)?.realm?.level + 1;
        const metadata = realmMetadata as {
          id: string;
          level: number;
          requireExp: number;
        }[];

        const nextRealm = metadata.find(
          (item) => nextLevel == item.level // Tìm cảnh giới tiếp theo
        );

        const payloadUpdate: {
          data: Record<string, any>;
          options;
        } = {
          data: {
            totalExp: Number(currentExp) + Number(earnExp),
          },
          options: {
            where: {
              id: body.id,
            },
          },
        };
        if (currentExp + earnExp >= nextRealm.requireExp) {
          payloadUpdate.data['realmId'] = nextRealm.id;
        }

        console.log('Payload update exp: ', payloadUpdate);
        this.logger.log('Upload exp....');
        return this.profileModel.update(
          payloadUpdate.data,
          payloadUpdate.options
        );
      }),
      map((response) => ({ message: '' })),
      catchError(() =>
        throwException(
          HttpStatusCode.InternalServerError,
          AccountAlert.ProfilePerformError
        )
      )
    );
  }

  private getCacheKey(
    id: string,
    type: 'REALM' | 'MATERIAL_ART' | 'ACHIEVEMENT' | 'SOCIAL' | 'ALL'
  ) {
    return `PROFILE_DETAIL#${type}#${id}`;
  }

  private getExpForUserByActionType(actionType: ActionExpType, ratio: number) {
    let result = 0;
    switch (actionType) {
      case ActionExpType.CHECK_IN:
        result = 10;
        break;
      case ActionExpType.READ_POST:
        result = 1;
        break;
      case ActionExpType.COMMENT_POST:
        result = 2;
        break;
      case ActionExpType.LIKE_POST:
        result = 1;
        break;
      case ActionExpType.DISLIKE_POST:
        result = 1;
        break;
      case ActionExpType.CREATE_GUILD:
        result = 1;
        break;
    }

    return ratio ? ratio * result : result;
  }
}
