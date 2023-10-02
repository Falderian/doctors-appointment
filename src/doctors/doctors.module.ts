import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Slot } from './entities/slots.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Slot])],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
