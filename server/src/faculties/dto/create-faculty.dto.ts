import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFacultyDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    universityId: number
}
