import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Slot } from './slots.entities';

@Entity()
@Unique(['name', 'spec'])
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  spec: string;

  @OneToMany(() => Slot, (slot) => slot.doctor, {
    onDelete: 'CASCADE',
  })
  slots: Slot[];
}
