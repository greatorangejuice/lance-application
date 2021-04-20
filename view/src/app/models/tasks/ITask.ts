import { User } from '../users/user';

export interface ITask {
  id: string;
  title: string;
  customer: User;
  executor: User | null;
  description: string;
  dueDate: Date;
  creationDate: Date;
  telegramId?: string;
  vkId?: string;
  taskType?: string;
  subject: ISubject;
  status: number;
}
export interface ISubject {
  title: string;
  id: number;
  tag: string;
}
