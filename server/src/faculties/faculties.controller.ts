import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { UniversitiesService } from "../universities/universities.service";
import { Auth } from "../auth/auth.decorator";
import { ERole } from "../models/roles/enums/role.enum";
import { CreateUniversityDto } from "../universities/dto/create-university.dto";
import { PaginationOptionsInterface } from "../pagination/pagination.options.interface";
import { Faculty } from "../models/faculty/faculty.entity";
import { FacultiesService } from "./faculties.service";
import { CreateFacultyDto } from "./dto/create-faculty.dto";

@Controller('faculties')
export class FacultiesController {
    constructor(private readonly service: FacultiesService) {}

    @Post()
    createItem(@Body() createFacultyDto: CreateFacultyDto) {
        return this.service.createFaculty(createFacultyDto);
    }

    @Get()
    getAllItems(@Query() query) {
        const paginationOptions: PaginationOptionsInterface = {
            limit: query.hasOwnProperty('limit') ? query.limit : 10,
            page: query.hasOwnProperty('page') ? query.page : 0,
        };
        return this.service.getAllFaculties(paginationOptions);
    }
}
