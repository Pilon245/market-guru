import { Inject, Injectable } from '@nestjs/common';
import { User } from '../domain/entities/users.entity';
import { QueryTypes } from 'sequelize';
import { SortDirection } from '../../helper/query.validation';
import { getPagesCounts, getSkipNumber } from '../../helper/response.function';

export type FindUsersPayload = {
  pageSize: number;
  pageNumber: number;
  sortBy: string;
  sortDirection: SortDirection;
  searchNameTerm?: string;
  searchEmailTerm?: string;
  searchPhoneTerm?: string;
};

type SelectCount = { count: number };

@Injectable()
export class UsersQueryRepository {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async findUserById(id: string) {
    return this.usersRepository.findOne({
      where: { id: id },
      attributes: ['id', 'name', 'email', 'phone', 'createdAt'],
    });
  }

  async findUsers({
    searchNameTerm,
    searchEmailTerm,
    searchPhoneTerm,
    sortDirection,
    sortBy,
    pageSize,
    pageNumber,
  }: FindUsersPayload) {
    const replacements = {
      searchNameTerm: `%${searchNameTerm}%`,
      searchEmailTerm: `%${searchEmailTerm}%`,
      searchPhoneTerm: `%${searchPhoneTerm}%`,
    };

    const skip = getSkipNumber(pageNumber, pageSize);

    const query = `SELECT id, name, email, phone, "createdAt"
            FROM public."Users" WHERE UPPER(name) LIKE UPPER(:searchNameTerm)
      AND UPPER(email) LIKE UPPER(:searchEmailTerm)
      AND UPPER(phone) LIKE UPPER(:searchPhoneTerm) 
      ORDER BY "${sortBy}" ${sortDirection}
      LIMIT ${pageSize} OFFSET  ${skip}`;

    const users: User[] = await this.usersRepository.sequelize.query(query, {
      replacements,
      type: QueryTypes.SELECT,
    });

    const totalCount: SelectCount[] =
      await this.usersRepository.sequelize.query(
        `SELECT   count(*)
    FROM public."Users" WHERE UPPER(name) LIKE UPPER(:searchNameTerm)
    AND UPPER(email) LIKE UPPER(:searchEmailTerm)
    AND UPPER(phone) LIKE UPPER(:searchPhoneTerm)`,
        {
          replacements,
          type: QueryTypes.SELECT,
        },
      );

    return {
      pagesCount: getPagesCounts(+totalCount[0].count, pageSize),
      page: pageNumber,
      pageSize: pageSize,
      totalCount: +totalCount[0].count,
      items: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        phone: u.phone,
        createdAt: u.createdAt,
      })),
    };
  }

  async deleteAll() {
    return this.usersRepository.truncate();
  }
}
