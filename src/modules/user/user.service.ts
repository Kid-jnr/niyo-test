import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PasswordHelper } from 'src/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

export const roundsOfHashing = 10;

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async register(userInfo: CreateUserDto) {
    const hashedPassword = await PasswordHelper.hashPassword(userInfo.password);
    userInfo.password = hashedPassword;
    const user = await this.userRepository.createUser({ data: userInfo });
    return user;
  }

  async findOne(id: number) {
    return await this.userRepository.getUser({
      where: { id },
    });
  }
}
