import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/users/dto/UserDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: UserDto) {
        return this.authService.login(userDto)
    }

    @Post('/registration')
    registration(@Body() userDto: UserDto) {
        return this.authService.registration(userDto)
    }
}
