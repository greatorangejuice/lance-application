import { SortEnum } from '../models/sort.enum';

export interface PaginationOptionsInterface {
  limit: number;
  page: number;
  sort?: SortEnum;
}
