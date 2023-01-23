/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { unlinkSync } from 'fs'
import { join } from 'path'

import { FileEntity, FileType } from './entities/file.entity';
import { generateId } from './storage';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>
  ) {}

  create(file: Express.Multer.File, userId: number) {
    return this.repository.save({
      fileId: generateId(),
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      user: { id: userId },
    });
  }

  findAll(userId: number, type: FileType) {
    const qb = this.repository.createQueryBuilder('file');

    qb.where('file.userId = :userId', { userId });

    if (type === FileType.PHOTOS) {
      qb.andWhere('file.mimetype ILIKE :type', { type: '%image%' });
    }
    
    if (type === FileType.TRASH) {
      qb.withDeleted().andWhere('file.deletedAt IS NOT NULL');
    }
    
    return qb.getMany();
  }

  async remove(userId: number, ids: string) {
    const qb = this.repository.createQueryBuilder('file');

    const idsArray = ids.split(',');

    qb.where('id IN (:...ids) AND file.userId = :userId', {
      ids: idsArray, 
      userId, 
    });

    const files = await qb.getMany();

    for (const file of files) {
      try {
        unlinkSync(join(__dirname, '../..', 'uploads', file.filename));
      } catch (error) {
        console.log(`Failed to upload file: ${file.filename}`)
      }
    }

    return qb
      .where('id IN (:...ids) AND userId = :userId', {
        ids: idsArray,
        userId,
      })
      .softDelete()
      .execute()
  }
}
