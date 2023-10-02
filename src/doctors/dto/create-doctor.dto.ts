import { IsNotEmpty, MinLength, Validate } from 'class-validator';
import { DoctorsSpecValidator } from '../validators/doctor.validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @Validate(DoctorsSpecValidator)
  spec: string;
}
