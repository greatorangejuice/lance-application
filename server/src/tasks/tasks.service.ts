import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { CurrentUser } from '../models/current-user';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../models/tasks/tasks.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ChangeExecutorDto } from './dto/change-executor.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private usersService: UsersService,
  ) {}
  async createTask(createTaskDto: CreateTaskDto, currentUser: CurrentUser) {
    try {
      const { dueDate, title, description } = createTaskDto;
      const newTask = new Task();
      newTask.description = description;
      newTask.title = title;
      newTask.dueDate = dueDate;
      newTask.status = false;
      if (createTaskDto.link) {
        newTask.link = createTaskDto.link;
      }

      // @ts-ignore
      newTask.customer = currentUser.userId;
      return await this.tasksRepository.save(newTask);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateTaskWithoutExecutor(updateTaskDto: UpdateTaskDto) {
    try {
      const { id, description, dueDate, title, link, status } = updateTaskDto;
      const updatedTask = {
        title: title,
        description: description,
        dueDate: dueDate,
        link: link,
        status: status,
      };
      return await this.tasksRepository.update(id, updatedTask).then(() => {
        return { code: 200, message: 'Task was successfully updated' };
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async assignTaskByExecutor(taskId: string, executorId: string) {
    try {
      const executor = await this.usersService.findUserById(executorId);
      return await this.tasksRepository
        .update(taskId, {
          // @ts-ignore
          executor: executor,
        })
        .then(() => {
          return { code: 200, message: 'User is assigned' };
        });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async changeExecutor(changeExecutorDto?: ChangeExecutorDto) {
    try {
      const { id } = changeExecutorDto;
      if (changeExecutorDto.executorId) {
        const { executorId } = changeExecutorDto;
        const executor = await this.usersService.findUserById(executorId);
        return await this.tasksRepository
          .update(id, {
            // @ts-ignore
            executor: executor,
          })
          .then(() => {
            return { code: 200, message: 'Task was successfully updated' };
          });
      } else {
        return await this.tasksRepository.update(id, {
          executor: null,
        });
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
