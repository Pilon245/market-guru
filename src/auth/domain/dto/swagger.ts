import { ApiProperty } from '@nestjs/swagger';

export class GetMyAccount {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;
  @ApiProperty()
  createdAt: string;
}

export class ErrorCode4__ {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}

export class loginType {
  @ApiProperty()
  accessToken: string;
}

export class loginBodyType {
  @ApiProperty({ default: '+79090201199' })
  login: string;
  @ApiProperty({ default: '12345678' })
  password: string;
}
