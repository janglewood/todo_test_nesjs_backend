import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Post,
  Put,
  Request,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { RegisterUserDto } from './user.dto';
// import { RegisterUserDto } from './user.dto';

@Controller('/')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('users')
  async getAllUsers(@Req() req) {
    return await this.usersService.getUsers();
  };

  @Get('user/:id')
  getUser(@Param('id', new ParseIntPipe()) id) {
    return this.usersService.getUser(id);
  };

  @Delete('users')
  deleteUser(@Body('id', new ParseIntPipe()) id) {
    return this.usersService.deleteUser(id);
  };

  @Post('users')
  createUser(@Body() user: Users) {
    return this.usersService.createUser(user);
  };

  @Put('user/:id')
  async editUser(@Body() user) {
    return this.usersService.editUser(user);
  };

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
