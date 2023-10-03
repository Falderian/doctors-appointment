import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './entities/slots.entities';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { DoctorsModule } from '../doctors/doctors.module';
import { UsersModule } from 'src/users/users.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([Slot]),
    DoctorsModule,
    UsersModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [SlotsController],
  providers: [SlotsService],
})
export class SlotsModule {}
