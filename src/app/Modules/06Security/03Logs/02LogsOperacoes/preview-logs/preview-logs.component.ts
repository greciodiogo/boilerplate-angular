import { HttpParams } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Filter } from '@app/shared/models/Filters/Filter';
import { Pagination } from '@app/shared/models/pagination';
import { FnService } from '@app/shared/services/fn.helper.service';
import { LogsService } from '../../services/logs.service';

@Component({
  selector: 'app-preview-logs',
  templateUrl: './preview-logs.component.html',
  styleUrls: ['./preview-logs.component.css'],
})
export class PreviewLogsComponent implements OnInit {
  @Input() logs: any;
  @Input() logs_test: any;

  @Input() simpleForm: FormGroup;
  @Input() notFound = 'Nenhum dado Histórico Encontrado';

  @Input() title: string = '';
  @Input() is_modal: boolean = true;
  @Output() public loadList = new EventEmitter<any>();

  public pagination = new Pagination();
  public filter = new Filter();

  public submitted = false;

  constructor(
    public logsService: LogsService,
    public configService: FnService
  ) {}

  ngOnInit(): void {}

  onReset() {
    this.pagination = new Pagination();
    this.filter = new Filter();
    this.title = 'Histórico de Logs';
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.logs !== null) {
      //this._new = this.logs.new_data;
      //this._old = this.logs.old_data;
      //this._new = this.cleanString(this.logs?.new_data);
      //this._old = this.cleanString(this.logs?.old_data);
      //this.title = 'Histórico de Logs';
      //this.logs = this.configService.diffDataJson(this._new, this._old);
      //console.log(this.logs);
      //this.cliente.nome = this.propostas?.cliente?.nome;
    }
  }
}
