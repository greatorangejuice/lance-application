import { User } from '../users/user';

export class Task {
  id!: string;
  customer!: User;
  executor?: User;
  description!: string;
}
