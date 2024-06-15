import { Booking } from 'src/booking/entities/booking.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  maxCapacity: number;

  @Column('double')
  price: number;

  @Column()
  description: string;

  @OneToMany(() => Booking, (item) => item.room)
  booking: Booking;
}
