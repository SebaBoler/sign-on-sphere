import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class InputCreateUserDto {
  @ApiProperty({ minLength: 1, maxLength: 256 , description: 'The name of the user'})
  @IsNotEmpty()
  @Length(1, 256)
  @IsString()
  readonly name: string;

  @ApiProperty({ minLength: 8, maxLength: 256, format: 'email', description:'The email of the user' })
  @IsNotEmpty()
  @Length(8, 256)
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @ApiProperty({ minLength: 8, maxLength: 25, description: 'The password of the user' })
  @IsNotEmpty()
  @Length(8, 25)
  @IsString()
  readonly password: string;
}
