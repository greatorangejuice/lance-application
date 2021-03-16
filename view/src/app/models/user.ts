import { Role } from './role';

export class User {
  id!: number;
  firstname!: string;
  lastname!: string;
  email!: string;
  roles!: Role[];
  accessToken?: string;
  refreshToken?: string;
}
