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
import { MetadataAlert } from '@shared/alert/metadata';

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
        message: MetadataAlert.RealmCreated,
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
        message: MetadataAlert.RealmListed,
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
        message: MetadataAlert.RealmFound,
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
          message: MetadataAlert.RealmUpdated,
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
          message: MetadataAlert.RealmDeleted,
        };
      }),
      from
    );
  }
}
