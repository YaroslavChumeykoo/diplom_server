import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [
    SequelizeModule.forFeature( [Task] ),
    AuthModule,
  ]
})
export class TasksModule {}
