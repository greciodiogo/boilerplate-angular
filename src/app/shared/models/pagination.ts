import { PaginationInterface } from '../interfaces/PaginationInterface';

export class Pagination implements PaginationInterface {
  lastPage: number=5;
  page: number = 1;
  perPage: number;
  total: number;
}
