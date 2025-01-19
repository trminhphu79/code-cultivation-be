import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import {
  CreateAchievementDto,
  MetadataPaginationDto,
  UpdateAchievementDto,
} from '@shared/dtos/metadata';

import { Achievement } from '@shared/models/achievement';
import { Op } from 'sequelize';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MetadataAlert } from '@shared/alert/metadata';

interface ServiceResponse<T> {
  data: T;
  message: string;
}

@Injectable()
export class AchievementService {
  constructor(
    @InjectModel(Achievement) private readonly achievementModel: typeof Achievement
  ) {}

  create(dto: CreateAchievementDto): Observable<ServiceResponse<Achievement>> {
    return from(this.achievementModel.create(dto as any)).pipe(
      map((achievement) => ({
        data: achievement,
        message: MetadataAlert.AchievementCreated,
      }))
    );
  }

  findAll(dto: MetadataPaginationDto): Observable<{
    data: Achievement[];
    meta: { total: number; offset: number; limit: number };
    message: string;
  }> {
    const {
      offset = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = dto;


    const whereClause = search
      ? {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        }
      : {};

    return from(
      this.achievementModel.findAndCountAll({
        where: whereClause,
        limit,
        offset,
        order: [[sortBy, sortOrder]],
      })
    ).pipe(
      map(({ rows, count }) => ({
        data: rows,
        meta: {
          total: count,
          offset,
          limit,
        },
        message: MetadataAlert.AchievementListed,
      }))
    );
  }

  findOne(id: string): Observable<ServiceResponse<Achievement>> {
    return from(
      this.achievementModel.findByPk(id, {
        rejectOnEmpty: true,
      })
    ).pipe(
      map((achievement) => ({
        data: achievement,
        message: MetadataAlert.AchievementFound,
      }))
    );
  }

  update(
    id: string,
    dto: UpdateAchievementDto
  ): Observable<ServiceResponse<Achievement>> {
    return from(
      this.achievementModel.findByPk(id, {
        rejectOnEmpty: true,
      })
    ).pipe(
      map(async (achievement) => {
        await achievement.update(dto);
        return {
          data: achievement,
          message: MetadataAlert.AchievementUpdated,
        };
      }),
      from
    );
  }

  remove(id: string): Observable<ServiceResponse<void>> {
    return from(
      this.achievementModel.findByPk(id, {
        rejectOnEmpty: true,
      })
    ).pipe(
      map(async (achievement) => {
        await achievement.destroy();
        return {
          data: undefined,
          message: MetadataAlert.AchievementDeleted,
        };
      }),
      from
    );
  }
}
