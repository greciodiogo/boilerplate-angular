import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { PipeFormat } from './model';

@Pipe({
  name: 'formatCell',
})
export class FormatCellPipe implements PipeTransform {
  constructor(
    private datePipe: DatePipe,
  ) {}

  transform(value: any, format: PipeFormat) {
    if (value === undefined) {
      return '-';
    }

    if (format === 0) {
      if (Array.isArray(value)) {
        if (typeof value[0] !== 'object') {
          return value.join(', ');
        } else {
          return value.map((obj) => {
            return `${obj.firstName} ${obj.lastName}`;
          });
        }
      }
      if (typeof value === 'object') {
        return value?.name;
      }
    }

  

    if (format === 2) {
      return this.datePipe.transform(value, 'medium');
    }

  

    return value;
  }
}
