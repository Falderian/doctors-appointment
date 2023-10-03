import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
// import { Slot } from '../slots/entities/slots.entities';
// import { randomDate } from 'src/utils/utils';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>, // @InjectRepository(Slot) private slotsRepository: Repository<Slot>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const isDoctorExists = await this.findByNameSpec(createDoctorDto);
    if (isDoctorExists)
      throw new ConflictException(
        `Doctor with name = ${createDoctorDto.name} & spec = ${createDoctorDto.spec} is already exists`,
      );
    const newDoc = await this.doctorsRepository.save(createDoctorDto);
    this.generateDocsSlots(newDoc.id);
    return newDoc;
  }

  async findAll() {
    return await this.doctorsRepository.find();
  }

  async findOne(id: number) {
    return await this.doctorsRepository.findOneBy({ id });
  }

  async getDocWithSlots(id: number) {
    return await this.doctorsRepository.find({
      relations: ['slots'],
      where: { id, slots: [{ isTaken: true }] },
    });
  }

  async findByNameSpec(createDoctorDto: CreateDoctorDto) {
    return await this.doctorsRepository.findOneBy({
      name: createDoctorDto.name,
      spec: createDoctorDto.spec,
    });
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }

  async generateDocsSlots(doctorId: number) {
    const limit = +(Math.random() * 100).toFixed();
    const doc = await this.findOne(doctorId);
    for (let i = 0; i < limit; i++) {
      // await this.slotsRepository.save({
      //   date: randomDate(),
      //   doctor: doc,
      //   isTaken: false,
      // });
    }
  }
}
