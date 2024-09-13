import { FilterInterface } from "@app/shared/interfaces/FilterInterface";

export class FilterCliente implements FilterInterface {
    search: string = '';
    orderBy: string = '';
    typeOrderBy: string = 'DESC'; 
    typeFilter: string = '';
    constructor() {}
}