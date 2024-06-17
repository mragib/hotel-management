import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import { PickType } from '@nestjs/swagger';

export class UpdateBookingDto extends PartialType(
  PickType(CreateBookingDto, [
    'startDate',
    'endDate',
    'numOfGuest',
    'status',
  ] as const),
) {}
