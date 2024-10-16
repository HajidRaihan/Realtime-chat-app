import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: "user should have a title"})
    @IsString()
    name: string

    
}