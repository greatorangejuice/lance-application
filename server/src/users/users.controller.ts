import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from '../auth/auth.decorator';
import { ERole } from '../models/roles/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('all')
  @Auth(ERole.User, ERole.Manager, ERole.Admin)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
