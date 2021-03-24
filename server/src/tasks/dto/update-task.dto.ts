import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  @IsOptional()
  dueDate: Date;

  @IsString()
  @IsOptional()
  executorId: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsString()
  @IsOptional()
  link: string;
}
