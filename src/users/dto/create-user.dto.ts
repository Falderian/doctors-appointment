import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5)
  phone: string;

  @IsNotEmpty()
  @MinLength(4)
  name: string;
}
