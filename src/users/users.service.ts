import { Injectable, HttpException, Body, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Users } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>
  ) { };

  getUsers(): Promise<Users[]> {
    return this.userRepository.find();
  };

  getUser(userID): Promise<Users[]> {
    return this.userRepository.findByIds([userID]);
  };

  async deleteUser(userID): Promise<Users[]> {
    const user = await this.getUser(userID);
    return this.userRepository.remove(user);
  };

  async createUser(user): Promise<Users[]> {
    return await this.userRepository.save(user);
  };

  async editUser(data): Promise<any> {
    return await this.userRepository.update(data.id, data);
  };
}