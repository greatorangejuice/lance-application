import { ITask } from './ITask';

export interface TaskApi {
  results: ITask[];
  page_total: number;
  total: number;
}
