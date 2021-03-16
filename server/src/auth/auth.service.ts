import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { environment } from '../../environment';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.getUserWithRolesAndPassword(email);
      const comparedPassword = await bcrypt.compareSync(
        password,
        user.password,
      );

      if (comparedPassword) {
        return user;
      }
      return null;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      roles: user.roles.map((role) => role.role),
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(
        { token: 'refresh' },
        { expiresIn: '30d', secret: environment.refreshSecretKey },
      ),
      email: user.email,
      roles: payload.roles,
    };
  }
}
