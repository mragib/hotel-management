import { CreateBookingDto } from './create-booking.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateBookingDto extends PickType(CreateBookingDto, [
  'startDate',
  'endDate',
  'numOfGuest',
  'status',
]) {}
