import { Injectable } from '@nestjs/common';
import { MaterialArt } from '@shared/models/material-art';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateMaterialArtDto,
  MetadataPaginationDto,
  UpdateMaterialArtDto,
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
export class MaterialArtService {
  constructor(
    @InjectModel(MaterialArt)
    private readonly materialArtModel: typeof MaterialArt
  ) {}

  create(dto: CreateMaterialArtDto): Observable<ServiceResponse<MaterialArt>> {
    return from(this.materialArtModel.create(dto as any)).pipe(
      map((materialArt) => ({
        data: materialArt,
        message: MetadataAlert.MaterialArtCreated,
      }))
    );
  }

  findAll(dto: MetadataPaginationDto): Observable<{
    data: MaterialArt[];
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
      this.materialArtModel.findAndCountAll({
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
        message: MetadataAlert.MaterialArtListed,
      }))
    );
  }

  findOne(id: string): Observable<ServiceResponse<MaterialArt>> {
    return from(
      this.materialArtModel.findByPk(id, {
        rejectOnEmpty: true,
      })
    ).pipe(
      map((materialArt) => ({
        data: materialArt,
        message: MetadataAlert.MaterialArtFound,
      }))
    );
  }

  update(
    id: string,
    dto: UpdateMaterialArtDto
  ): Observable<ServiceResponse<MaterialArt>> {
    return from(
      this.materialArtModel.findByPk(id, {
        rejectOnEmpty: true,
      })
    ).pipe(
      map(async (materialArt) => {
        await materialArt.update(dto);
        return {
          data: materialArt,
          message: MetadataAlert.MaterialArtUpdated,
        };
      }),
      from
    );
  }

  remove(id: string): Observable<ServiceResponse<void>> {
    return from(
      this.materialArtModel.findByPk(id, {
        rejectOnEmpty: true,
      })
    ).pipe(
      map(async (materialArt) => {
        await materialArt.destroy();
        return {
          data: undefined,
          message: MetadataAlert.MaterialArtDeleted,
        };
      }),
      from
    );
  }
}
