import { IsNotEmpty, IsString } from 'class-validator';

export class updateUserDto {
//   @IsNotEmpty({ message: 'user should have a title' })
  @IsString()
  bio: string;
}
