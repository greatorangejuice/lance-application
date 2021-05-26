import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddAnimalDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  livingCountry: string;
}
