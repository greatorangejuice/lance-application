import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../models/tasks/tasks.entity';
import { Repository } from 'typeorm';
import { Animal } from '../models/animals/animal.entity';
import { AddAnimalDto } from '../models/animals/dto/add-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalsRepository: Repository<Animal>,
  ) {}

  async getAllAnimals() {
    try {
      return await this.animalsRepository.find();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async addAnimal(addAnimalDto: AddAnimalDto) {
    try {
      const newAnimal = { ...new Animal(), ...addAnimalDto };
      return await this.animalsRepository.save(newAnimal);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
