import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';

import { AbstractService } from 'src/common/abstract.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking, BookingStatus } from './entities/booking.entity';
import {
  Between,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { differenceInDays } from 'date-fns';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class BookingService extends AbstractService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private readonly roomService: RoomService,
  ) {
    super(bookingRepository);
  }

  async create(createBookingDto: CreateBookingDto) {
    const { startDate, endDate, room } = createBookingDto;

    // Ensure startDate and endDate are Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Validate overlapping bookings except those with status CANCELLED
    const overlappingBookings = await this.bookingRepository.find({
      where: [
        {
          room,
          status: Not(BookingStatus.CANCELLED),
          startDate: Between(start, end),
        },
        {
          room,
          status: Not(BookingStatus.CANCELLED),
          endDate: Between(start, end),
        },
        {
          room,
          status: Not(BookingStatus.CANCELLED),
          startDate: LessThanOrEqual(start),
          endDate: MoreThanOrEqual(end),
        },
      ],
    });

    if (overlappingBookings.length > 0) {
      throw new BadRequestException(
        'The room is already booked for the selected date range.',
      );
    }

    let stay;
    differenceInDays(endDate, startDate)
      ? (stay = differenceInDays(endDate, startDate))
      : (stay = 1);

    const roomObj = await this.roomService.findOne({ id: room.id });

    const totalPrice = roomObj.price * stay;

    return this.bookingRepository.save({
      numOfDays: stay,
      totalPrice: parseFloat(totalPrice.toString()),
      ...createBookingDto,
    });
  }
}
