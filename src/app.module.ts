import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'diplome',
    models: [User],
    autoLoadModels: true
  }),
  UsersModule,
  AuthModule,
  TasksModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', '/photo'), // путь к папке 'photo'
    serveRoot: '/photo/', // URL-префикс, по которому будут доступны файлы
  }),
],
  controllers: [],
  providers: [],
})
export class AppModule {}
