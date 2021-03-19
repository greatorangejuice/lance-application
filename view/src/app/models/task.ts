import { User } from './user';

export interface ITask {
  id: string;
  customer: User;
  executor: User;
  description: string;
}
