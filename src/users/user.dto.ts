import {
  IsEmail,
  IsNotEmpty,
  IsAlpha,
  Length,
  IsAlphanumeric
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsAlpha()
  firstname: string;

  @IsNotEmpty()
  @IsAlpha()
  lastname: string;

  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @Length(8, 8)
  password: string;
};

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsAlphanumeric()
  @Length(8, 8)
  password: string;
};

export class createUserDto {
  @IsNotEmpty()
  @IsAlpha()
  firstname: string;

  @IsNotEmpty()
  @IsAlpha()
  lastname: string;

  @IsEmail()
  email: string;

  description?: string;
};