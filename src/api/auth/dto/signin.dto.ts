import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please type a valid email!' })
  email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password should have atleast 6 letters!' })
  @MaxLength(20, { message: 'Password should have less than 20 letters!' })
  password: string;
}
