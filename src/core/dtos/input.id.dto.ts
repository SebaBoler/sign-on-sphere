import { IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class InputIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Min(1)
  @Type(() => String)
  readonly id: string;
}
