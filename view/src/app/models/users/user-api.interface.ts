import { User } from './user';

export interface UserApi {
  results: User[];
  page_total: number;
  total: number;
}
