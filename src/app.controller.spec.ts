import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './app.module';

let app: INestApplication;
let server: any;
let api: request.SuperTest<request.Test>;

afterAll(async () => {
  await app.close();
});

describe('AppController (e2e)', () => {
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
    api = request(server);
  });
  test('All data delete', () => {
    return api.delete('/users/test/all-delete').expect(200);
  });
  test('/create users', () => {
    const usersBody = {
      name: 'Anton',
      password: '12345678',
      email: 'pochta@bk.ru',
      phone: '+79287882132',
    };

    return api
      .post('/users')
      .send(usersBody)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          createdAt: expect.any(String),
          email: 'pochta@bk.ru',
          id: expect.any(String),
          name: 'Anton',
          phone: '+79287882132',
        });
      });
  });
  test('create  account', () => {
    const usersBody = {
      name: 'Ivan',
      password: '12345678',
    };

    return api
      .post('/users')
      .send(usersBody)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          createdAt: expect.any(String),
          email: null,
          id: expect.any(String),
          name: 'Ivan',
          phone: null,
        });
      });
  });

  test('login in account', () => {
    const usersBody = {
      login: '+79287882132',
      password: '12345678',
    };

    return api
      .post('/auth/login')
      .send(usersBody)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          accessToken: expect.any(String),
        });
      });
  });

  test('login in account', () => {
    const usersBody = {
      login: 'Ivan',
      password: '12345678',
    };

    return api
      .post('/auth/login')
      .send(usersBody)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          accessToken: expect.any(String),
        });
      });
  });
  test('No valid login data ', () => {
    const usersBody = {
      name: 'Ivan',
      password: 'pass1234',
    };

    return api.post('/auth/login').send(usersBody).expect(401);
  });
});
