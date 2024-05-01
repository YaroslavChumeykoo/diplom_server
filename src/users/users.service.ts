import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.module';
import { UserDto } from './dto/UserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
  
  async getUsers() {
    return await this.userModel.findAll();
  }

  async createUser(dto: UserDto) {
    return await this.userModel.create(dto);
  }

  async getUserByEmail( email: string) {
    const user = await this.userModel.findOne({where: {email}})
    return user
  }
}

