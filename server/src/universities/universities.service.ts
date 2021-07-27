import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { PaginationOptionsInterface } from '../pagination/pagination.options.interface';
import { University } from '../models/university/university.entity';
import { Pagination } from '../pagination/pagination';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UniversitiesService {
    constructor(
        @InjectRepository(University)
        private repository: Repository<University>,
    ) {
    }

    async createUniversity(
        createUniversityDto: CreateUniversityDto,
    ): Promise<University> {
        try {
            const university = { ...new University(), ...createUniversityDto };
            return await this.repository.save(university);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getAllUniversities(
        paginationOptions: PaginationOptionsInterface,
    ): Promise<Pagination<University>> {
        try {
            const [results, total] = await this.repository.findAndCount({
                take: paginationOptions.limit,
                skip: paginationOptions.page,
            });
            return new Pagination<University>({
                results,
                total,
            });
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.NOT_FOUND);
        }
    }
}
