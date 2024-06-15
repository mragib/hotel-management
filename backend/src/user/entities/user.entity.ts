import * as bcrypt from 'bcrypt';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Exclude()
  first_name: string;

  @Column()
  @Exclude()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ default: false })
  isBlocked: boolean;

  @Column()
  @Exclude()
  salt: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ length: 50, unique: true })
  username: string;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  @Expose()
  get full_name(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}
