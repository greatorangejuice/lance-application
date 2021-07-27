import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskVkDto {
  @IsNumber()
  universityId: number;

  @IsNumber()
  facultyId: number;

  @IsNumber()
  course: number;

  @IsNumber()
  subjectId: number;

  @IsNumber()
  taskTypeId: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;

  @IsNumber()
  customerVkId: number;
}
