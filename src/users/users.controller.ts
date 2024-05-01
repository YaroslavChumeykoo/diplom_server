import { Body, Controller, Get, Post, Delete, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/UserDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { JwtRoleGuard } from 'src/auth/jwt-role-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtRoleGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
