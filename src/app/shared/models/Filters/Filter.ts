import { FilterInterface } from '@app/shared/interfaces/FilterInterface';

export class Filter implements FilterInterface {
  search: string = '';
  orderBy: string = '';
  typeOrderBy: string = 'DESC';
  typeFilter: string = '';
  mes: string = '';
  mes_to: string = '';
  mes_from: string = '';
  ano: string = '';
  dia: string = '';
  data: string = '';
  constructor() {}
}
