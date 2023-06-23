import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersRepository } from '../infrastucture/users.repository';

@ValidatorConstraint({ name: 'EmailExists', async: true })
@Injectable()
export class EmailExistsRule implements ValidatorConstraintInterface {
  constructor(private usersRepository: UsersRepository) {}

  async validate(value: string) {
    const result = await this.usersRepository.findUserLogin(value);
    if (result) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Email doesn't exist`;
  }
}
