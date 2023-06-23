import { Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginInputModel {
  @ApiProperty()
  @Length(0)
  login: string;
  @ApiProperty()
  @Length(0)
  password: string;
}
