import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Doctor } from './doctor.entity';
import { User } from '../../users/entities/user.entity';
import { Transform } from 'class-transformer';

@Entity()
@Unique(['id', 'doctor'])
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isTaken: boolean;

  @Transform((date) => date.value.toString(), {
    toPlainOnly: true,
  })
  @Column()
  date: Date;

  @ManyToOne(() => Doctor, (doctor) => doctor.slots, { cascade: true })
  doctor: Doctor;

  @ManyToOne(() => User, (user) => user.slots)
  user: User;
}
