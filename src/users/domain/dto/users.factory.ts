export class CreateUserUseCaseDto {
  name: string;
  password: string;
  email: string;
  phone: string;
}

export class UsersFactory {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public phone: string,
    public passwordHash: string,
    public createdAt: string,
  ) {}
}

export class UpdateUsersFactory {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
  ) {}
}

export class UpdateUserUseCaseDto {
  id: string;
  name: string;
  email: string;
  phone: string;
}
