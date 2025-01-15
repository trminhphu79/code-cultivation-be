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
        message: 'Thành tích đã được tạo thành công',
      }))
    );
  }

  findAll(dto: MetadataPaginationDto): Observable<{
    data: Achievement[];
    meta: { total: number; page: number; limit: number };
    message: string;
  }> {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = dto;

    const offset = (page - 1) * limit;

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
          page,
          limit,
        },
        message: 'Lấy danh sách thành tích thành công',
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
        message: 'Tìm thấy thành tích',
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
          message: 'Cập nhật thành tích thành công',
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
          message: 'Đã xóa thành tích thành công',
        };
      }),
      from
    );
  }
}
