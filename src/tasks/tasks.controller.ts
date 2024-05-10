import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/taskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { JwtRoleGuard } from 'src/auth/jwt-role-guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @UseGuards(JwtRoleGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  async createTask(@UploadedFile() file: Express.Multer.File, @Body() body) {
    const taskDto = {
      name: body.name,
      text: body.text,
      tag: body.tag,
      level: body.level,
      photo: file,
    };
    return await this.tasksService.createTask(taskDto);
  }

  @UseGuards(JwtRoleGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }

  // @UseGuards(JwtRoleGuard)
  // @UseGuards(JwtAuthGuard)
  // @Patch(':id')
  // updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.updateTask(id, updateTaskDto);
  // }
}
