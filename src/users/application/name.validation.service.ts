import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersRepository } from '../infrastucture/users.repository';

@ValidatorConstraint({ name: 'NameExists', async: true })
@Injectable()
export class NameExistsRule implements ValidatorConstraintInterface {
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
    return `Name doesn't exist`;
  }
}
