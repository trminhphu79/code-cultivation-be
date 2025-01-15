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
        message: 'Môn phái đã được tạo thành công',
      }))
    );
  }

  findAll(dto: MetadataPaginationDto): Observable<{
    data: Sect[];
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
          page,
          limit,
        },
        message: 'Lấy danh sách môn phái thành công',
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
        message: 'Tìm thấy môn phái',
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
          message: 'Cập nhật môn phái thành công',
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
          message: 'Đã xóa môn phái thành công',
        };
      }),
      from
    );
  }
}
