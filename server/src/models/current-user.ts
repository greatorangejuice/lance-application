import { ERole } from './roles/enums/role.enum';

export class CurrentUser {
  userId: string;
  email: string;
  roles: ERole[];
}
