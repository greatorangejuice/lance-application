import { IsNotEmpty, IsString } from 'class-validator';

export class AddCommentDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
