import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from '../auth/auth.decorator';
import { ERole } from '../models/roles/enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('search')
  // @Auth(ERole.Manager, ERole.Admin)
  getAllUsers(@Query() query) {
    return this.usersService.getAllUsers({
      limit: query.hasOwnProperty('limit') ? query.limit : 10,
      page: query.hasOwnProperty('page') ? query.page : 0,
    });
  }

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
