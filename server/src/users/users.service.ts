import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/users/user.entity';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async getUserWithRolesAndPassword(email) {
    try {
      return await getManager()
        .createQueryBuilder(User, 'user')
        .addSelect('user.password')
        .leftJoinAndSelect('user.roles', 'roles')
        .where(`user.email="${email}"`)
        .getOneOrFail();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
