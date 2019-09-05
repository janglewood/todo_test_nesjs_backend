import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Post,
  Put,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { createUserDto } from './user.dto';

@Controller('/')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
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
  createUser(@Body() user: createUserDto) {
    return this.usersService.createUser(user);
  };

  @Put('user/:id')
  async editUser(@Body() user) {
    return this.usersService.editUser(user);
  };
}
