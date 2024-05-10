import { Body, Controller, Get, Post, Delete, Param, ParseIntPipe, UseGuards, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/UserDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { JwtRoleGuard } from 'src/auth/jwt-role-guard';
import { updateUserDto } from './dto/updateRoleUserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtRoleGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtRoleGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  updateUser(@Param('id', ParseIntPipe) id: number,  @Body() role: updateUserDto,) {
    return this.usersService.updateUser(id, role);
  }
}
