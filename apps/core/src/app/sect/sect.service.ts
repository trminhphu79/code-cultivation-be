import { Injectable } from '@nestjs/common';
import { Sect } from '@shared/models/sect';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateSectDto,
  UpdateSectDto,
  MetadataPaginationDto,
} from '@shared/dtos/metadata';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Op } from 'sequelize';
import { MetadataAlert } from '@shared/alert/metadata';

interface ServiceResponse<T> {
  data: T;
  message: string;
}

@Injectable()
export class SectService {
  constructor(
    @InjectModel(Sect)
    private readonly sectModel: typeof Sect
  ) {}

  create(dto: CreateSectDto): Observable<ServiceResponse<Sect>> {
    return from(this.sectModel.create(dto as any)).pipe(
      map((sect) => ({
        data: sect,
        message: MetadataAlert.SectCreated,
      }))
    );
  }

  findAll(dto: MetadataPaginationDto): Observable<{
    data: Sect[];
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
      this.sectModel.findAndCountAll({
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
        message: MetadataAlert.SectListed,
      }))
    );
  }

  findOne(id: string): Observable<ServiceResponse<Sect>> {
    return from(
      this.sectModel.findByPk(id, {
        rejectOnEmpty: true,
      })
    ).pipe(
      map((sect) => ({
        data: sect,
        message: MetadataAlert.SectFound,
      }))
    );
  }

  update(id: string, dto: UpdateSectDto): Observable<ServiceResponse<Sect>> {
    return from(
      this.sectModel.findByPk(id, {
        rejectOnEmpty: true,
      })
    ).pipe(
      map(async (sect) => {
        await sect.update(dto);
        return {
          data: sect,
          message: MetadataAlert.SectUpdated,
        };
      }),
      from
    );
  }

  remove(id: string): Observable<ServiceResponse<void>> {
    return from(
      this.sectModel.findByPk(id, {
        rejectOnEmpty: true,
      })
    ).pipe(
      map(async (sect) => {
        await sect.destroy();
        return {
          data: undefined,
          message: MetadataAlert.SectDeleted,
        };
      }),
      from
    );
  }
}
