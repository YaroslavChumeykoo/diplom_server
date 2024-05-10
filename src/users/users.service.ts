import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.module';
import { UserDto } from './dto/UserDto';
import { updateUserDto } from './dto/updateRoleUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
  
  async getUsers() {
    return await this.userModel.findAll({ order: [['id', 'ASC']] });
  }

  async createUser(dto: UserDto) {
    return await this.userModel.create(dto);
  }

  async getUserByEmail( email: string) {
    const user = await this.userModel.findOne({where: {email}})
    return user
  }

  async updateUser(id: number, data: updateUserDto) {
    const [index, [result]] = await this.userModel.update(data, {
      where: { id },
      returning: true,
    });
    if (index === 0) throw new NotFoundException('Task not found');

    return result;
  }
}

