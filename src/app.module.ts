import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseConfig } from './config/database.config';
import { DoctorsModule } from './doctors/doctors.module';
import { SlotsModule } from './slots/slots.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConfig,
    UsersModule,
    DoctorsModule,
    SlotsModule,
  ],
})
export class AppModule {}
