import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUniversityDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  fullTitle: string;
}
