import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isUserAlreadyExists = await this.findByPhone(createUserDto.phone);
    if (isUserAlreadyExists)
      throw new ConflictException(
        'User with phone ' + createUserDto.phone + ' already exists',
      );
    const newUser = await this.usersRepository.save(createUserDto);
    return await this.findByPhone(newUser.phone);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({ id });
  }

  async findByPhone(phone: string) {
    return await this.usersRepository.findOneBy({ phone });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
