import { Injectable, HttpException, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Users } from './user.entity';
// import { User } from './interfaces/user.interface';
// import { BOOKS } from '../mocks/books.mock';

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

  createUser(user): Promise<Users[]> {
    return this.userRepository.save(user);
  };

  async editUser(data): Promise<any> { // ?????
    return await this.userRepository.update(data.id, data);
  };

  // async loginUser(data): Promise<any> {
  //   return await this.userRepository.
  // }

    async registerUser(data): Promise<any> {
    
  }
}