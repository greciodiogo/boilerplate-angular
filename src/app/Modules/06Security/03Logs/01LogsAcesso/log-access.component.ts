import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from '@app/shared/models/pagination';
import { Filter } from '@app/shared/models/Filters/Filter';
import { HttpParams } from '@angular/common/http';
import { LogsService } from '../services/logs.service';

@Component({
  selector: 'app-log-access',
  templateUrl: './log-access.component.html',
  styleUrls: ['./log-access.component.css'],
})
export class LogAccessComponent implements OnInit {
  public pagination = new Pagination();
  public filter = new Filter();
  public logs: any = [];

  public observableObj: Observable<any>;
  public subjectObj = new Subject<number>();

  constructor(public _route: Router, public logsService: LogsService) {}

  ngOnInit() {
    this.subjectObj.pipe(debounceTime(1000)).subscribe({
      next: () => this.listarLogAcesso(),
    });
    this.subjectObj.next(1);
  }

  public listarLogAcesso() {
    this.logsService.loading = true;
    var httpParams = new HttpParams()
      .set('page', (this.pagination.page || 1).toString())
      .set('perPage', (this.pagination.perPage || 5).toString())
      .set('search', this.filter.search.toString())
      .set('orderBy', this.filter.orderBy.toString())
      .set('typeOrderBy', this.filter.typeOrderBy.toString())
      .set('typeFilter', this.filter.typeFilter.toString());
    const search = this.filter.search;

    this.logsService.getLogsAccess(search, httpParams).subscribe(
      (data) => {
        this.logs = data.data;
        this.pagination.page = data.page;
        this.pagination.perPage = data.perPage;
        this.pagination.lastPage = data.lastPage;
        this.pagination.total = data.total;
      },
      (error) => {
        this.logsService.loading = false;
      }
    );
  }

  //--------------------------------------------------------------------------

  public getPageFilterData(page: number) {
    if (this.pagination.perPage == null) {
      return;
    }
    this.pagination.page = page;
    this.subjectObj.next(this.pagination.page);
  }
}
