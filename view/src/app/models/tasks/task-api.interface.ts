import { Task } from './task';

export interface TaskApi {
  results: Task[];
  page_total: number;
  total: number;
}
