import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class DoctorsSpecValidator implements ValidatorConstraintInterface {
  availableSpecs = ['Therapist', 'Surgeon', 'Ophthalmologist', 'Dentist'];

  validate(spec: string): boolean {
    return this.availableSpecs.includes(spec);
  }

  defaultMessage(args: ValidationArguments) {
    console.log(args.value);
    return `This doctor's spec = ${
      args.value
    }, is not allowed. Allowed specs = ${this.availableSpecs.join(', ')}`;
  }
}
