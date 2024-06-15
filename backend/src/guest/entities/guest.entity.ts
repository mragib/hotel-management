import { Booking } from 'src/booking/entities/booking.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  nationalID: string;

  @OneToMany(() => Booking, (item) => item.guest)
  booking: Booking;
}
