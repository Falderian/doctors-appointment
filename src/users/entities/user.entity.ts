import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Slot } from '../../slots/entities/slots.entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column()
  name: string;

  @OneToMany(() => Slot, (slot) => slot.user, {
    onDelete: 'CASCADE',
  })
  slots: Slot[];
}
