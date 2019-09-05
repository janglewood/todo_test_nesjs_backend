import {
  Controller,
  Body,
  Post,
  Request,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterUserDto } from '../users/user.dto';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';

@Controller('/')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    return await this.authService.registerUser(body);
  };

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() { user }) {
    return this.authService.login(user);
  };
}
