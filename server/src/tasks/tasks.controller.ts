import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { Auth } from '../auth/auth.decorator';
import { ERole } from '../models/roles/enums/role.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Me } from '../auth/current-user.decorator';
import { CurrentUser } from '../models/current-user';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ChangeExecutorDto } from './dto/change-executor.dto';
import { PaginationOptionsInterface } from '../pagination/pagination.options.interface';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Post('create')
  @Auth(ERole.User, ERole.Manager, ERole.Admin)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Me() currentUser: CurrentUser,
  ) {
    return this.tasksService.createTask(createTaskDto, currentUser);
  }

  @Get()
  getAllTasks(@Query() query) {
    const paginationOptions: PaginationOptionsInterface = {
      limit: query.hasOwnProperty('limit') ? query.limit : 10,
      page: query.hasOwnProperty('page') ? query.page : 0,
    };
    return this.tasksService.getAllTasks(paginationOptions);
  }

  @Patch('update')
  @Auth(ERole.User, ERole.Manager, ERole.Admin)
  updateTask(@Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTaskWithoutExecutor(updateTaskDto);
  }

  @Patch('update-executor')
  @Auth(ERole.Admin, ERole.Manager)
  updateExecutor(@Body() changeExecutorDto: ChangeExecutorDto) {
    return this.tasksService.changeExecutor(changeExecutorDto);
  }

  @Patch('assign-task')
  @Auth(ERole.Manager, ERole.Admin, ERole.User, ERole.Executor)
  assignTask(
    @Body() changeExecutorDto: ChangeExecutorDto,
    @Me() currentUser: CurrentUser,
  ) {
    const { id } = changeExecutorDto;
    return this.tasksService.assignTaskByExecutor(id, currentUser.userId);
  }
}
