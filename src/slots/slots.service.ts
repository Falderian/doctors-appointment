import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slot } from './entities/slots.entities';
import { ISlot } from './types/slots.types';
import { UsersService } from '../users/users.service';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class SlotsService {
  constructor(
    @InjectRepository(Slot)
    private readonly slotsRepository: Repository<Slot>,
    private userService: UsersService,
    private schedulerRegistry: SchedulerRegistry,
  ) {
    this.addSlotsNofitication();
  }

  async getAvailableSlots() {
    const slots = await this.slotsRepository.find({
      where: { isTaken: false },
      relations: ['doctor'],
    });
    return this.slotsReponse(slots);
  }

  async getAvailableDocsSlots(id: number) {
    const slots = await this.slotsRepository.find({
      where: { isTaken: false, doctor: { id } },
      relations: ['doctor'],
    });
    return this.slotsReponse(slots);
  }

  async getAvailableSpecsSlots(spec: string) {
    const slots = await this.slotsRepository.find({
      where: { isTaken: false, doctor: { spec } },
      relations: ['doctor'],
    });
    return this.slotsReponse(slots);
  }

  async takeSlot(slot: ISlot) {
    const findedSlot = await this.slotsRepository.findOne({
      where: { doctor: { id: slot.doctorId }, id: slot.id },
      relations: ['doctor', 'user'],
    });

    if (!findedSlot)
      throw new BadRequestException(`There is no slot with id = ${slot.id}`);
    else if (findedSlot.isTaken)
      throw new ConflictException(`This slot is already taken`);

    const user = await this.userService.findOne(slot.userId);
    const updatedSlot = await this.slotsRepository.save({
      ...findedSlot,
      isTaken: true,
      user: user,
    });
    return updatedSlot;
  }

  addTimeOut(name: string, mseconds: number) {
    const callback = () => {
      console.log(name);
    };

    const timeOut = setTimeout(callback, mseconds);
    this.schedulerRegistry.addTimeout(name, timeOut);
  }

  async addSlotsNofitication() {
    const slots = await this.slotsRepository.find({
      where: { isTaken: true },
      relations: ['user', 'doctor'],
    });
    const currDate = new Date();
    slots.forEach((slot) => {
      const dateToNotifyInHours = new Date(slot.date);
      const dateToNotifyInDay = new Date(slot.date);

      dateToNotifyInHours.setHours(dateToNotifyInHours.getHours() - 2);
      dateToNotifyInDay.setDate(dateToNotifyInDay.getDay() - 1);
      const diffFromNow = dateToNotifyInHours.getTime() - currDate.getTime();

      if (diffFromNow < 0) return;

      this.addTimeOut(
        `${currDate.toString()} | Hello ${
          slot.user.name
        }! Remind, you are scheduled to ${slot.doctor.spec}, in ${slot.date} `,
        diffFromNow,
      );
    });
  }

  slotsReponse(slots: Slot[]) {
    if (slots.length) {
      return slots;
    } else {
      return 'No slots are present';
    }
  }
}
