import {
  Controller,
  Get,
  Param,
  Delete,
  Body,
  Post,
  Put
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './user.entity';

@Controller('/')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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
}
