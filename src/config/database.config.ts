import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Doctor } from '../doctors/entities/doctor.entity';

ConfigModule.forRoot();

export const DatabaseConfig = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Doctor],
  synchronize: true,
  autoLoadEntities: true,
});
