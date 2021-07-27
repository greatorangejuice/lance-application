import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Auth } from '../auth/auth.decorator';
import { ERole } from '../models/roles/enums/role.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { Me } from '../auth/current-user.decorator';
import { CurrentUser } from '../models/current-user';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ChangeExecutorDto } from './dto/change-executor.dto';
import { PaginationOptionsInterface } from '../pagination/pagination.options.interface';
import { CreateTaskVkDto } from "./dto/create-task-vk.dto";

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // @Post('create')
  // @Auth(ERole.User, ERole.Manager, ERole.Admin)
  // createTask(
  //   @Body() createTaskDto: CreateTaskDto,
  //   @Me() currentUser: CurrentUser,
  // ) {
  //   return this.tasksService.createTask(createTaskDto, currentUser);
  // }

  @Post('createFromVK')
  createTaskFromVK(@Body() createTaskVkDto: CreateTaskVkDto) {
    return this.tasksService.createTask(createTaskVkDto);
  }

  @Get('byId/:id')
  getTaskById(@Param() id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Get('available')
  // @Auth(ERole.User, ERole.Manager, ERole.Admin, ERole.Executor)
  getAllAvailableTasks(@Query() query) {
    const paginationOptions: PaginationOptionsInterface = {
      limit: query.hasOwnProperty('limit') ? query.limit : 10,
      page: query.hasOwnProperty('page') ? query.page : 0,
    };
    return this.tasksService.getAllAvailableTasks(paginationOptions);
  }

  getTasksForCurrentExecutor(@Query() query, @Me() currentUser: CurrentUser) {
    const paginationOptions: PaginationOptionsInterface = {
      limit: query.hasOwnProperty('limit') ? query.limit : 10,
      page: query.hasOwnProperty('page') ? query.page : 0,
    };
    return this.tasksService.getTasksForCurrentExecutor(
      paginationOptions,
      currentUser.userId,
    );
  }

  @Patch('update')
  @Auth(ERole.User, ERole.Manager, ERole.Admin, ERole.Executor)
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
    const { taskId } = changeExecutorDto;
    return this.tasksService.assignTaskByExecutor(taskId, currentUser.userId);
  }
}
