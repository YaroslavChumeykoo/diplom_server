import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/UserDto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/user.module';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService
    ) {}

    async login( userDto: UserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user)
    }

    async registration(userDto: UserDto) {
        const thereUser = await this.userService.getUserByEmail(userDto.email);
        if (thereUser) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user)
    }

    async generateToken(user: User) {
        const paylod = {email: user.email, id: user.id, role: user.role}
        return {
            token: this.jwtService.sign(paylod),
            role: user.role,
        }
    }

    async validateUser(userDto: UserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (passwordEquals) {
                return user;
            }
            throw new  UnauthorizedException({message: 'Incorrect email or password'})
        } else throw new  UnauthorizedException({message: 'Incorrect email'})
        
    }
}
