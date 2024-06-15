import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  maxCapacity: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}
