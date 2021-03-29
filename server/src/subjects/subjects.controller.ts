import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}
  @Post('create')
  createSubject(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.createSubject(createSubjectDto);
  }

  @Get()
  getAllSubjects(@Query() query) {
    const options = {
      limit: query.hasOwnProperty('limit') ? query.limit : 10,
      page: query.hasOwnProperty('page') ? query.page : 0,
    };
    return this.subjectsService.getAllSubjects(options);
  }
}
