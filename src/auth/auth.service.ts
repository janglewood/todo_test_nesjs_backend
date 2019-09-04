import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { Repository, DeleteResult, getConnectionOptions } from 'typeorm';
import { Users } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as util from 'util';
import { ConfigService } from '../config/config.service';
import { RegisterUserDto } from 'src/users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { };

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      const salt = await this.configService.getString('DB_SALT');
      const getHashedPassword = util.promisify(crypto.pbkdf2);
      const hashedPassword = await getHashedPassword(password, salt, 5000, 8, 'sha512');
      if (user.password === hashedPassword.toString('hex')) {
        const { password, ...result } = user;
        return result;
      } else {
        return { message: 'Password is invalid' };
      }
    } else {
      return { message: 'User with that email does not exist' };
    }
  };

  async registerUser({ firstname, lastname, email, password }: RegisterUserDto): Promise<any> {
    const salt = await this.configService.getString('DB_SALT');
    const getHashedPassword = util.promisify(crypto.pbkdf2);
    const hashedPassword = await getHashedPassword(password, salt, 5000, 8, 'sha512');
    const isUserExist = await this.userRepository.findOne({ where: { email: email } });

    if (isUserExist) {
      throw new HttpException('User with that email already exist', HttpStatus.SERVICE_UNAVAILABLE);
    };

    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      description: null,
      password: hashedPassword.toString('hex'),
      role: 'USER'
    };

    const registredUser = await this.userRepository.save(user);
    return this.login(registredUser);
  };

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      firstname: user.firstname,
      id: user.id,
      role: user.role
    };
  }
};
