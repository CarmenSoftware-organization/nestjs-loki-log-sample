import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'ชื่อของผู้ใช้',
    example: 'สมชาย ใจดี',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'อีเมลของผู้ใช้',
    example: 'somchai@example.com',
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'อายุของผู้ใช้',
    example: 25,
    minimum: 1,
    maximum: 120,
  })
  @IsNumber()
  @Min(1)
  @Max(120)
  age: number;
}
