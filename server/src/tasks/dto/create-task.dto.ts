import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;

  @IsString()
  @IsOptional()
  customerId: string;

  @IsString()
  @IsOptional()
  link: string;
}
