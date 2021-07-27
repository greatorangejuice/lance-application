import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TaskTypesService } from './task-types.service';
import { Auth } from '../auth/auth.decorator';
import { ERole } from '../models/roles/enums/role.enum';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { PaginationOptionsInterface } from '../pagination/pagination.options.interface';

@Controller('task-types')
export class TaskTypesController {
  constructor(private readonly taskTypesService: TaskTypesService) {}

  @Post()
  @Auth(ERole.Manager, ERole.Admin)
  createTaskType(@Body() createTaskTypeDto: CreateTaskTypeDto) {
    return this.taskTypesService.createTaskType(createTaskTypeDto);
  }

  @Get()
  getAllTaskTypes(@Query() query) {
    const paginationOptions: PaginationOptionsInterface = {
      limit: query.hasOwnProperty('limit') ? query.limit : 10,
      page: query.hasOwnProperty('page') ? query.page : 0,
    };
    return this.taskTypesService.getAllTaskTypes(paginationOptions);
  }
}
