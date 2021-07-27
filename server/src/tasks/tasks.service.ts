import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { CurrentUser } from '../models/current-user';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../models/tasks/tasks.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ChangeExecutorDto } from './dto/change-executor.dto';
import { UsersService } from '../users/users.service';
import { PaginationOptionsInterface } from '../pagination/pagination.options.interface';
import { Pagination } from '../pagination/pagination';
import { CreateTaskVkDto } from "./dto/create-task-vk.dto";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private usersService: UsersService,
  ) {}

  async createTask(createTaskVkDto: CreateTaskVkDto, currentUser?: CurrentUser) {
    try {
      const { dueDate, description, customerVkId, taskTypeId, subjectId, universityId, facultyId } = createTaskVkDto;
      const newTask = new Task();
      newTask.description = description;
      // newTask.title = title;
      newTask.dueDate = dueDate;
      newTask.status = 0;
      newTask.customerVkId = customerVkId;
      // @ts-ignore
      newTask.taskType = taskTypeId;
      // @ts-ignore
      newTask.faculty = facultyId;
      // @ts-ignore
      newTask.subject = subjectId;
      // if (createTaskVkDto.link) {
      //   newTask.link = createTaskVkDto.link;
      // }

      if (currentUser) {
        // @ts-ignore
        newTask.customer = currentUser.userId;
      }
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
      const task = await this.tasksRepository.findOneOrFail(taskId, {
        relations: ['customer', 'executor', 'subject'],
      });
      if (task.status === 1) {
        throw new HttpException(
          'This task has already executer',
          HttpStatus.CONFLICT,
        );
      }

      return await this.tasksRepository
        .update(taskId, {
          // @ts-ignore
          executor: executor,
          status: 1,
        })
        .then(() => {
          return { ...task, status: 1, executor: executor };
        });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async changeExecutor(changeExecutorDto?: ChangeExecutorDto) {
    try {
      const { taskId } = changeExecutorDto;
      if (changeExecutorDto.executorId) {
        const { executorId } = changeExecutorDto;
        const executor = await this.usersService.findUserById(executorId);
        return await this.tasksRepository
          .update(taskId, {
            // @ts-ignore
            executor: executor,
          })
          .then(() => {
            return { code: 200, message: 'Task was successfully updated' };
          });
      } else {
        return await this.tasksRepository.update(taskId, {
          executor: null,
        });
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllAvailableTasks(
    paginationOptions: PaginationOptionsInterface,
  ): Promise<Pagination<Task>> {
    try {
      const [results, total] = await this.tasksRepository.findAndCount({
        take: paginationOptions.limit,
        skip: paginationOptions.page,
        relations: ['subject', 'faculty', 'faculty.university'],
        where: { status: 0 },
      });
      results.map((item) => {
        return item.subject.title;
      });

      return new Pagination<Task>({
        results,
        total,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async getTaskById(id: string) {
    try {
      return await this.tasksRepository.findOneOrFail(id, {
        relations: ['subject'],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async getTasksForCurrentExecutor(
    paginationOptions: PaginationOptionsInterface,
    executorId: string,
  ) {
    try {
      const [results, total] = await this.tasksRepository.findAndCount({
        take: paginationOptions.limit,
        skip: paginationOptions.page,
        relations: ['customer', 'executor', 'subject'],
        where: { status: 1, executor: executorId },
      });

      return new Pagination<Task>({
        results,
        total,
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }
}
