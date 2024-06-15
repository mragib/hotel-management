import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), RoomModule],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
