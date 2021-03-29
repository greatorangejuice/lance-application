import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '../models/subjects/subjects.entity';
import { Repository } from 'typeorm';
import { Pagination } from '../pagination/pagination';
import { User } from '../models/users/user.entity';
import { PaginationOptionsInterface } from '../pagination/pagination.options.interface';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async createSubject(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    try {
      const { title, tag } = createSubjectDto;
      const newSubject = new Subject();
      newSubject.title = title;
      newSubject.tag = tag;
      return await this.subjectRepository.save(newSubject);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllSubjects(
    paginationOptions: PaginationOptionsInterface,
  ): Promise<Pagination<Subject>> {
    try {
      const [results, total] = await this.subjectRepository.findAndCount({
        take: paginationOptions.limit,
        skip: paginationOptions.page,
      });

      return new Pagination<Subject>({
        results,
        total,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
