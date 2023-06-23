import {
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { PhoneExistsRule } from '../../application/phone.validation.service';
import { EmailExistsRule } from '../../application/email.validation.service';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserInputModel {
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @Length(6, 20)
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  @IsOptional()
  @IsString()
  @Validate(EmailExistsRule)
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Validate(PhoneExistsRule)
  phone: string;
}

export class UpdateUserInputModel {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  @IsOptional()
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone: string;
}
