import { Module } from '@nestjs/common';
import { TaskTypesController } from './task-types.controller';
import { TaskTypesService } from './task-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskType } from '../models/task-type/task-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskType])],
  controllers: [TaskTypesController],
  providers: [TaskTypesService],
})
export class TaskTypesModule {}
