import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersRepository } from '../infrastucture/users.repository';

@ValidatorConstraint({ name: 'PhoneExists', async: true })
@Injectable()
export class PhoneExistsRule implements ValidatorConstraintInterface {
  constructor(private usersRepository: UsersRepository) {}

  async validate(value: string) {
    if (typeof value !== 'string') {
      return false;
    }
    const result = await this.usersRepository.findUserLogin(value);
    if (result) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Phone doesn't exist`;
  }
}
