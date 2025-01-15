import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateRealmDto,
  UpdateRealmDto,
  MetadataPaginationDto,
} from '@shared/dtos/metadata';
import { Realm } from '@shared/models/realm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Op } from 'sequelize';

interface ServiceResponse<T> {
  data: T;
  message: string;
}

@Injectable()
export class RealmService {
  constructor(
    @InjectModel(Realm)
    private realmModel: typeof Realm
  ) {}

  create(dto: CreateRealmDto): Observable<ServiceResponse<Realm>> {
    return from(this.realmModel.create(dto as any)).pipe(
      map((realm) => ({
        data: realm,
        message: 'Realm đã được tạo thành công',
      }))
    );
  }

  findAll(dto: MetadataPaginationDto): Observable<{
    data: Realm[];
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
            {
              description: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        }
      : {};

    return from(
      this.realmModel.findAndCountAll({
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
        message: 'Lấy danh sách realm thành công',
      }))
    );
  }

  findOne(id: string): Observable<ServiceResponse<Realm>> {
    return from(
      this.realmModel.findByPk(id, {
        rejectOnEmpty: true,
      })
    ).pipe(
      map((realm) => ({
        data: realm,
        message: 'Tìm thấy realm',
      }))
    );
  }

  update(id: string, dto: UpdateRealmDto): Observable<ServiceResponse<Realm>> {
    return from(
      this.realmModel.findByPk(id, {
        rejectOnEmpty: true,
      })
    ).pipe(
      map(async (realm) => {
        await realm.update(dto);
        return {
          data: realm,
          message: 'Cập nhật realm thành công',
        };
      }),
      from
    );
  }

  remove(id: string): Observable<ServiceResponse<void>> {
    return from(
      this.realmModel.findByPk(id, {
        rejectOnEmpty: true,
      })
    ).pipe(
      map(async (realm) => {
        await realm.destroy();
        return {
          data: undefined,
          message: 'Đã xóa realm thành công',
        };
      }),
      from
    );
  }
}
