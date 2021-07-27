import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { Auth } from '../auth/auth.decorator';
import { ERole } from '../models/roles/enums/role.enum';
import { CreateUniversityDto } from './dto/create-university.dto';
import { PaginationOptionsInterface } from '../pagination/pagination.options.interface';

@Controller('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Post()
  @Auth(ERole.Manager, ERole.Admin)
  createUniversity(@Body() createUniversityDto: CreateUniversityDto) {
    return this.universitiesService.createUniversity(createUniversityDto);
  }

  @Get()
  getAllUniversities(@Query() query) {
    const paginationOptions: PaginationOptionsInterface = {
      limit: query.hasOwnProperty('limit') ? query.limit : 10,
      page: query.hasOwnProperty('page') ? query.page : 0,
    };
    return this.universitiesService.getAllUniversities(paginationOptions);
  }
}
