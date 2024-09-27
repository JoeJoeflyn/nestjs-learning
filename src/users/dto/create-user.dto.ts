import { IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  name: string;
}
