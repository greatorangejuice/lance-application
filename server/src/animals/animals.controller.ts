import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AddAnimalDto } from '../models/animals/dto/add-animal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  getAllAnimals() {
    return this.animalsService.getAllAnimals();
  }

  @Post()
  addAnimal(@Body() addAnimalDto: AddAnimalDto) {
    return this.animalsService.addAnimal(addAnimalDto);
  }
}
