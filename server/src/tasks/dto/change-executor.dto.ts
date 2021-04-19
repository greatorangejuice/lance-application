import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ChangeExecutorDto {
  @IsNotEmpty()
  @IsString()
  taskId: string;

  @IsString()
  @IsOptional()
  executorId: string;
}
