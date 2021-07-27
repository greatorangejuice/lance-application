import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PaginationOptionsInterface } from "../pagination/pagination.options.interface";
import { CreateFacultyDto } from "./dto/create-faculty.dto";
import { Faculty } from "../models/faculty/faculty.entity";
import { University } from "../models/university/university.entity";
import { Pagination } from "../pagination/pagination";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class FacultiesService {

    constructor(
        @InjectRepository(Faculty)
        private repository: Repository<Faculty>,
    ) {
    }

    async createFaculty(createFacultyDto: CreateFacultyDto): Promise<Faculty> {
        try {
            const faculty = { ...new Faculty(), title: createFacultyDto.title };
            // @ts-ignore
            faculty.university = createFacultyDto.universityId;
            return await this.repository.save(faculty);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getAllFaculties(paginationOptions: PaginationOptionsInterface): Promise<Pagination<Faculty>> {
        try {
            const [results, total] = await this.repository.findAndCount({
                take: paginationOptions.limit,
                skip: paginationOptions.page,
                relations: ['university']
            });
            return new Pagination<Faculty>({
                results,
                total,
            });
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.NOT_FOUND);
        }
    }
}
