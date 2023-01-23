/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { FileEntity } from './entities/file.entity';
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

  findAll() {
    return `This action returns all files`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
