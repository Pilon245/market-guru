import { ApiProperty } from '@nestjs/swagger';

export class GetUsers {
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

export class IResponseUser {
  @ApiProperty()
  pagesCount: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  totalCount: number;
  @ApiProperty()
  items: GetUsers;
}

export class CreateUserError {
  @ApiProperty()
  statusCode: number;
  @ApiProperty({ type: Array })
  message: Array<string>;
  @ApiProperty()
  error: string;
}

export class UpdateUserError {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}
