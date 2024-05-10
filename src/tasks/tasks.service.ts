import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Task } from './task.module';
import { InjectModel } from '@nestjs/sequelize';
import { TaskDto } from './dto/taskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';
import * as path from 'path';
import * as fs from 'fs-extra';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task)
        private readonly taskModel: typeof Task,
      ) {}

    async getTasks() {
        return await this.taskModel.findAll({ order: [['id', 'ASC']] });
    }

    async createTask(taskDto: any): Promise<Task> {
        // Сохранение файла, если он есть
        let photoUrl = '';
        if (taskDto.photo) {;
          photoUrl = `photo/${Date.now()}.png`;
          fs.writeFileSync(photoUrl, taskDto.photo.buffer);
        }
    
        // Создание записи задачи
        const newTask = this.taskModel.create({
          name: taskDto.name,
          text: taskDto.text,
          tag: taskDto.tag,
          level: taskDto.level,
          photo: `${photoUrl ? `http://localhost:3001/${photoUrl}` : ''}`,
        });
        
        console.log(photoUrl)
        return newTask;
      }

    async deleteTask(id: number) {
        const result = await this.taskModel.destroy({where: {id}})
        if(result === 0)  throw new  UnauthorizedException({messege: 'Неправильный id'})
        return 'Задача удаленна'
    }

    // async updateTask(id: number, data: UpdateTaskDto) {
    //     const task = await this.taskModel.findByPk(id);
    //     if (!task) {
    //         throw new  UnauthorizedException({messege: 'Неправильный id'})
    //     }
    //     this.taskModel.update(data, { where: { id } });
    
    //     return 'Задача обновлена';
    // }
}
