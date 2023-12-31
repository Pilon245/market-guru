import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/domain/entities/users.entity';
import * as pg from 'pg';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialectModule: pg,
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        autoLoadModels: true,
        synchronize: true,
        logging: false,
        models: [User],
        ssl: true,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false, // только для разработки, не рекомендуется для продакшена
          },
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
