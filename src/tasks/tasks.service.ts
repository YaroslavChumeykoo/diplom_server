import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Task } from './task.module';
import { InjectModel } from '@nestjs/sequelize';
import { TaskDto } from './dto/taskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task)
        private readonly taskModel: typeof Task,
      ) {}

    async getTasks() {
        return await this.taskModel.findAll();
    }

    async createTask(taskDto: TaskDto) {
        return await this.taskModel.create(taskDto);
    }

    async deleteTask(id: number) {
        const result = await this.taskModel.destroy({where: {id}})
        if(result === 0)  throw new  UnauthorizedException({messege: 'Неправильный id'})
        return 'Задача удаленна'
    }

    async updateTask(id: number, data: UpdateTaskDto) {
        const task = await this.taskModel.findByPk(id);
        if (!task) {
            throw new  UnauthorizedException({messege: 'Неправильный id'})
        }
        this.taskModel.update(data, { where: { id } });
    
        return 'Задача обновлена';
    }
}
