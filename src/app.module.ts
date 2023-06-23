import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from './service/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    CqrsModule,
    AuthModule,
  ],
})
export class AppModule {}
