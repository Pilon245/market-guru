import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module';
import io from 'socket.io-client';

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
  test('/create add string File', () => {
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
  test('no created no valid body', () => {
    const usersBody = {
      name: 123123,
      password: '12345678',
      email: 'pochta@bk.ru',
      phone: '+79287882132',
    };

    return api.post('/users').send(usersBody).expect(400);
  });
  test('no created no valid body', () => {
    const usersBody = {
      password: 12345678,
      email: 'pochta@bk.ru',
      phone: '+79287882132',
    };

    return api.post('/users').send(usersBody).expect(400);
  });
});

// describe('AppController', () => {
//   let usersController: UsersController;
//
//   beforeAll(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       imports: [UsersModule],
//     }).compile();
//
//     usersController = app.get<UsersController>(UsersController);
//   });
//
//   describe('create users', () => {
//     it('/create', () => {
//       expect().toMatchObject(usersBody);
//     });
//   });
// });
