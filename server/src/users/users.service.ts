import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/users/user.entity';
import { getManager, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { PaginationOptionsInterface } from '../pagination/pagination.options.interface';
import { Pagination } from '../pagination/pagination';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly rolesService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { firstname, lastname, email } = createUserDto;
      const candidate = await this.usersRepository.findOne({
        where: { email: email },
      });
      if (candidate) {
        return { code: 409, message: `Email ${email} already exist` };
      }
      const roles = await this.rolesService.getAllRoles();
      const userRole = roles.find((role) => {
        return role.role === 'user';
      });
      const newUser = new User();
      newUser.firstname = firstname;
      newUser.lastname = lastname;
      newUser.email = email;
      newUser.roles = [userRole];

      return await this.usersRepository.save(newUser);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllUsers(
    paginationOptions: PaginationOptionsInterface,
  ): Promise<Pagination<User>> {
    const [results, total] = await this.usersRepository.findAndCount({
      take: paginationOptions.limit,
      skip: paginationOptions.page,
      relations: ['roles'],
    });

    return new Pagination<User>({
      results,
      total,
    });
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

  async findUserById(id: string): Promise<User> {
    try {
      return await this.usersRepository.findOneOrFail(id);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }
}
