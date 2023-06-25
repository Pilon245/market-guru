import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { createWriteStream } from 'fs';
import { get } from 'http';

const serverUrl = 'http://localhost:5000';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(cookieParser());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('REST API')
    .setDescription(
      '1. Поднять и настроить веб приложение на nestjs\n' +
        '2. Подключить sequelize или sequelize typescript, настроить подключение к базе postgresql, создать модель User, написать миграцию.\n' +
        '   Базу можно поднять локально в docker.\n' +
        '3. Написать CRUD функционал к user, c валидацией входных параметров.\n' +
        '   Так же нужно реализовать функционал getAll, с поддержкой постраничной отдачи данных и поиском по нескольким полям: "mail", \'name\' etc.\n' +
        '4. Реализовать возможность регистрации и авторизации пользователя с помощью email и password, или телефон и пароль.\n' +
        '   Авторизация должна поддерживать оба поля для возможности входа.\n' +
        '   При добавлении пользователем почты, при первоначальной регистрации с помощью телефона,\n' +
        '   он так же должен иметь возможность залогинится используя почту, и наоборот.\n' +
        '5. Наcтроить модуль swagger для генерации документации и включить его в проект.',
    )
    .setVersion('1.0')
    .addTag('MarketGuru')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(new ConfigService().get<string>('PORT'));

  // get the swagger json file (if app is running in development mode)
  if (process.env.NODE_ENV === 'development') {
    // write swagger ui files
    get(`${serverUrl}/swagger/swagger-ui-bundle.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-bundle.js'));
      console.log(
        `Swagger UI bundle file written to: '/swagger-static/swagger-ui-bundle.js'`,
      );
    });

    get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui-init.js'));
      console.log(
        `Swagger UI init file written to: '/swagger-static/swagger-ui-init.js'`,
      );
    });

    get(
      `${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('swagger-static/swagger-ui-standalone-preset.js'),
        );
        console.log(
          `Swagger UI standalone preset file written to: '/swagger-static/swagger-ui-standalone-preset.js'`,
        );
      },
    );

    get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('swagger-static/swagger-ui.css'));
      console.log(
        `Swagger UI css file written to: '/swagger-static/swagger-ui.css'`,
      );
    });
  }
}

bootstrap();
