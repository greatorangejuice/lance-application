export interface Pagination<Entity> {
  results: Entity[];
  page_total: number;
  total: number;
}
