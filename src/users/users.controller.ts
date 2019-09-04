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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('/')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) { }

  @Get()
  getAllUsers() {
    return this.usersService.getUsers();
  };

  @Get('user/:id')
  getUser(@Param('id') id) {
    return this.usersService.getUser(id);
  };

  @Delete()
  deleteUser(@Body('id') id) {
    return this.usersService.deleteUser(id);
  };

  @Post()
  createUser(@Body() user) {
    return this.usersService.createUser(user);
  };

  @Put()
  async editUser(@Body() user) {
    return this.usersService.editUser(user);
  };

  @Post('register')
  async register(@Request() req) {
    return await this.authService.registerUser(req.body);
  };

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  };
}
