import { Role } from './role';

export class User {
  id!: string;
  firstname!: string;
  lastname!: string;
  email!: string;
  roles!: Role[];
  accessToken?: string;
  refreshToken?: string;
}
