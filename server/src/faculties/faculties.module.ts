import { Module } from '@nestjs/common';
import { FacultiesController } from './faculties.controller';
import { FacultiesService } from './faculties.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Faculty } from "../models/faculty/faculty.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Faculty])],
  controllers: [FacultiesController],
  providers: [FacultiesService]
})
export class FacultiesModule {}
