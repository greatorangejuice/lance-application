import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationOptionsInterface } from '../pagination/pagination.options.interface';
import { Pagination } from '../pagination/pagination';
import { TaskType } from '../models/task-type/task-type.entity';

@Injectable()
export abstract class IndexService<T> {
  protected constructor(
    // @ts-ignore
    @InjectRepository(T)
    private repository: Repository<T>,
  ) {}

  async getItems(
    paginationOptions: PaginationOptionsInterface,
  ): Promise<Pagination<T>> {
    try {
      const [results, total] = await this.repository.findAndCount({
        take: paginationOptions.limit,
        skip: paginationOptions.page,
      });
      return new Pagination<T>({
        results,
        total,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  // async createItem() {
  //   try {
  //
  //   } catch (e) {
  //       throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
  //   }
  // }
}
