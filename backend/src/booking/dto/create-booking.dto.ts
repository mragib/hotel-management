import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
} from 'class-validator';
import { BookingStatus } from '../entities/booking.entity';
import { Room } from 'src/room/entities/room.entity';
import { Guest } from 'src/guest/entities/guest.entity';

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  // @ApiProperty()
  // @IsEmpty()
  // @IsNumber()
  // numOfDays: number;

  @ApiProperty()
  @IsNumber()
  numOfGuest: number;

  // @ApiProperty()
  // @IsEmpty()
  // @IsNumberString()
  // totalPrice: number;

  @ApiProperty()
  @IsEnum(BookingStatus)
  status: BookingStatus;

  @ApiProperty()
  @IsObject()
  room: Room;

  @ApiProperty()
  @IsObject()
  guest: Guest;
}
