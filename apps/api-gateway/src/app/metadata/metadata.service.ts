import { Injectable } from '@nestjs/common';
import { Realm } from '@shared/models/realm';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateAchievementDto,
  CreateMaterialArtDto,
  CreateRealmDto,
  CreateSectDto,
  DeleteDto,
} from '@shared/dtos/metadata';
import { MaterialArt } from '@shared/models/material-art';
import { Achievement } from '@shared/models/achievement';
import { Sect } from '@shared/models/sect';
import { InjectFileUploader, FileUploader } from '@shared/file-uploader';
import { throwException } from '@shared/exception';
import { HttpStatusCode } from 'axios';
import { ReadStream } from 'fs';

@Injectable()
export class MetadataService {
  constructor(
    @InjectModel(Sect)
    private readonly sectModel: typeof Sect,
    @InjectModel(Realm)
    private readonly realmModel: typeof Realm,
    @InjectModel(MaterialArt)
    private readonly materialArtModel: typeof MaterialArt,
    @InjectModel(Achievement)
    private readonly achievementModel: typeof Achievement,
    @InjectFileUploader()
    private readonly fileUploader: FileUploader
  ) {
    console.log('fileUploader: ', this.fileUploader);
  }

  // Create Realm
  createRealm(body: CreateRealmDto) {
    return from(this.realmModel.create({ ...body })).pipe(
      map((res) => ({
        data: res.toJSON(),
        message: 'Tạo thành công cấp bậc tu luyện.',
      }))
    );
  }

  // Update Realm
  updateRealm(body: any) {
    const { id, ...rest } = body;
    return from(this.realmModel.findByPk(id)).pipe(
      switchMap((realm) => {
        if (!realm) {
          return of({
            message: 'Cấp bậc tu luyện không tồn tại.',
          });
        }
        return from(realm.update({ ...rest })).pipe(
          map((updated) => ({
            data: updated.toJSON(),
            message: 'Cập nhật thành công cấp bậc tu luyện.',
          }))
        );
      })
    );
  }

  // Delete Realm
  deleteRealm(body: DeleteDto) {
    return from(this.realmModel.findByPk(body.id)).pipe(
      switchMap((realm) => {
        if (!realm) {
          return of({ message: 'Cấp bậc tu luyện không tồn tại.' });
        }
        return from(realm.destroy()).pipe(
          map(() => ({
            message: 'Xóa thành công cấp bậc tu luyện.',
          }))
        );
      })
    );
  }

  // Create Material Art
  createMaterialArt(
    body: CreateMaterialArtDto & { logo: string | Buffer | ReadStream }
  ) {
    return this.fileUploader
      .upload({
        file: 'https://www.milofoundation.org/wp-content/uploads/2024/09/20240928130759.jpg',
        fileName: 'test_material',
        folder: 'logo',
      })
      .pipe(
        catchError((err) => {
          console.log('Error upload: ', err);
          return throwException(
            HttpStatusCode.InternalServerError,
            'Tải lên hình ảnh không thành công.'
          );
        }),
        switchMap((response) => {
          console.log('Upload response: ', response);
          if (response && response?.url) {
            return from(
              this.materialArtModel.create({ ...body, logo: response.url })
            ).pipe(
              map((res) => ({
                data: res.toJSON(),
                message: 'Tạo thành công bộ môn võ học.',
              }))
            );
          }
          
          throwException(
            HttpStatusCode.InternalServerError,
            'Tải lên hình ảnh không thành công.'
          );
        })
      );
  }

  // Update Material Art
  updateMaterialArt(body: any) {
    const { id, ...rest } = body;
    return from(this.materialArtModel.findByPk(id)).pipe(
      switchMap((materialArt) => {
        if (!materialArt) {
          return of({
            message: 'Bộ môn võ học không tồn tại.',
          });
        }
        return from(materialArt.update({ ...rest })).pipe(
          map((updated) => ({
            data: updated.toJSON(),
            message: 'Cập nhật thành công bộ môn võ học.',
          }))
        );
      })
    );
  }

  // Delete Material Art
  deleteMaterialArt(body: DeleteDto) {
    return from(this.materialArtModel.findByPk(body.id)).pipe(
      switchMap((materialArt) => {
        if (!materialArt) {
          return of({ message: 'Bộ môn võ học không tồn tại.' });
        }
        return from(materialArt.destroy()).pipe(
          map(() => ({
            message: 'Xóa thành công bộ môn võ học.',
          }))
        );
      })
    );
  }

  // Create Achievement
  createAchievement(body: CreateAchievementDto) {
    return from(this.achievementModel.create({ ...body })).pipe(
      map((res) => ({
        data: res.toJSON(),
        message: 'Tạo thành công thành tựu.',
      }))
    );
  }

  // Update Achievement
  updateAchievement(body: any) {
    const { id, ...rest } = body;
    return from(this.achievementModel.findByPk(id)).pipe(
      switchMap((achievement) => {
        if (!achievement) {
          return of({
            message: 'Thành tựu không tồn tại.',
          });
        }
        return from(achievement.update({ ...rest })).pipe(
          map((updated) => ({
            data: updated.toJSON(),
            message: 'Cập nhật thành công thành tựu.',
          }))
        );
      })
    );
  }

  // Delete Achievement
  deleteAchievement(body: DeleteDto) {
    return from(this.achievementModel.findByPk(body.id)).pipe(
      switchMap((achievement) => {
        if (!achievement) {
          return of({ message: 'Thành tựu không tồn tại.' });
        }
        return from(achievement.destroy()).pipe(
          map(() => ({
            message: 'Xóa thành công thành tựu.',
          }))
        );
      })
    );
  }

  // Create Sect
  createSect(body: CreateSectDto) {
    return from(this.sectModel.create({ ...body })).pipe(
      map((res) => ({
        data: res.toJSON(),
        message: 'Tạo thành công môn phái.',
      }))
    );
  }

  // Update Sect
  updateSect(body: any) {
    const { id, ...rest } = body;
    return from(this.sectModel.findByPk(id)).pipe(
      switchMap((sect) => {
        if (!sect) {
          return of({
            message: 'Môn phái không tồn tại.',
          });
        }
        return from(sect.update({ ...rest })).pipe(
          map((updated) => ({
            data: updated.toJSON(),
            message: 'Cập nhật thành công môn phái.',
          }))
        );
      })
    );
  }

  // Delete Sect
  deleteSect(body: DeleteDto) {
    return from(this.sectModel.findByPk(body.id)).pipe(
      switchMap((sect) => {
        if (!sect) {
          return of({ message: 'Môn phái không tồn tại.' });
        }
        return from(sect.destroy()).pipe(
          map(() => ({
            message: 'Xóa thành công môn phái.',
          }))
        );
      })
    );
  }
}
