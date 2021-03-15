import { SortEnum } from '../sort.enum';

export interface PaginationOptionsInterface {
  limit: number;
  page: number;
  sort?: SortEnum;
}
