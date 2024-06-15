import { Guest } from 'src/guest/entities/guest.entity';
import { Room } from 'src/room/entities/room.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum BookingStatus {
  UNCONFIRM = 'unconfirmed',
  CHECKED_OUT = 'checked-out',
  CHECKED_IN = 'checked-in',
  CANCELLED = 'cancel',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  numOfDays: number;

  @Column()
  numOfGuest: number;

  @Column('double')
  totalPrice: number;

  //   @Column({
  //     type: 'enum',
  //     enum: bookingStatus,
  //     default: bookingStatus.UNCONFIRM,
  //   })
  @Column({ type: 'text' })
  status: BookingStatus;

  @ManyToOne(() => Room, (item) => item.booking)
  room: Room;

  @ManyToOne(() => Guest, (item) => item.booking)
  guest: Guest;
}
