import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-delete-data',
  templateUrl: './delete-data.component.html',
  styleUrls: ['./delete-data.component.css'],
})
export class DeleteDataComponent implements OnInit {
  @Input() is_modal: boolean = true;
  @Input() modalName: string = '';
  @Input() data: string = '';

  @Output() public loadList = new EventEmitter<any>();
  @Output() public fnDelete = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    // console.log(this.modalName);
  }

  public delete() {
    this.fnDelete.emit(this.data);
    this.loadList.emit(this.data);
  }
}
