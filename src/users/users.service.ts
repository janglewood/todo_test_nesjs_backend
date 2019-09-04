import { Injectable, HttpException, Body } from '@nestjs/common';
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
    let id = Number(userID);
    return this.userRepository.findByIds([id]);
  };

  async deleteUser(userID): Promise<Users[]> {
    const user = await this.getUser(Number(userID));
    return this.userRepository.remove(user);
  };

  async createUser(user): Promise<Users[]> {
    const x = await this.userRepository.save(user);
    return x;
  };

  async editUser(data): Promise<any> { 
    return await this.userRepository.update(data.id, data);
  };
}