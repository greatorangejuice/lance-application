import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskType } from '../models/task-type/task-type.entity';
import { Repository } from 'typeorm';
import { PaginationOptionsInterface } from '../pagination/pagination.options.interface';
import { Pagination } from '../pagination/pagination';

@Injectable()
export class TaskTypesService {
  constructor(
    @InjectRepository(TaskType)
    private taskTypeRepository: Repository<TaskType>,
  ) {}

  async createTaskType(
    createTaskTypeDto: CreateTaskTypeDto,
  ): Promise<TaskType> {
    try {
      const newTaskType = { ...new TaskType(), ...createTaskTypeDto };
      return await this.taskTypeRepository.save(newTaskType);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllTaskTypes(
    paginationOptions: PaginationOptionsInterface,
  ): Promise<Pagination<TaskType>> {
    try {
      const [results, total] = await this.taskTypeRepository.findAndCount({
        take: paginationOptions.limit,
        skip: paginationOptions.page,
      });
      return new Pagination<TaskType>({
        results,
        total,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }
}
