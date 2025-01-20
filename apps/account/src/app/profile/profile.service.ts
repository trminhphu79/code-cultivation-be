import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from '@shared/models/profile';
import {
  CreateSocialProfileDto,
  UpdateSocialProfileDto,
  DeleteSocialProfileDto,
} from '@shared/dtos/account';
import { catchError, from, map, merge, mergeMap, of, tap } from 'rxjs';
import { CacheManagerService, CacheMessageAction } from '@shared/cache-manager';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProfileSocial } from 'shared/models/src/profile-social.model';
import { AccountAlert } from '@shared/alert/account';
import { HttpStatusCode } from 'axios';
import { throwException } from '@shared/exception';

@Injectable()
export class ProfileService {
  private readonly logger = new Logger(ProfileService.name);
  private readonly TTL_CACHE_TIME = 7 * 24 * 60 * 60;

  constructor(
    @InjectModel(Profile)
    private readonly profileModel: typeof Profile,
    @InjectModel(ProfileSocial)
    private readonly profileSocialModel: typeof ProfileSocial,
    private readonly cacheService: CacheManagerService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  handleGetDetailProfile(id: string) {
    const cacheKey = this.getCacheKey(id);
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
            attributes: ['id'],
            include: [
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
          AccountAlert.SocialProfileError
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
          AccountAlert.SocialProfileError
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
          AccountAlert.SocialProfileError
        )
      ),
      map(() => {
        return {
          message: AccountAlert.SocialProfileDeleteSuccess,
        };
      })
    );
  }

  private getCacheKey(id: string) {
    return `PROFILE_DETAIL#${id}`;
  }
}
