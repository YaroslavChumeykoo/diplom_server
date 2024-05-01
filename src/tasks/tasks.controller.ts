import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/taskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { JwtRoleGuard } from 'src/auth/jwt-role-guard';

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
  createTask(@Body() taskDto: TaskDto) {
    return this.tasksService.createTask(taskDto);
  }

  @UseGuards(JwtRoleGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }

  @UseGuards(JwtRoleGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }
}
