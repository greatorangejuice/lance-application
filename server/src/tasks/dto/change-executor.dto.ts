import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ChangeExecutorDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  executorId: string;
}
