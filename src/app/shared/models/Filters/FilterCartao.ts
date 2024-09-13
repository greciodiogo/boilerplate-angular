import { FilterInterface } from '@app/shared/interfaces/FilterInterface';

export class FilterCartao implements FilterInterface {
  search: string = '';
  orderBy: string = '';
  typeOrderBy: string = 'DESC'; 
  typeFilter: string = '';
  constructor() {}
}
