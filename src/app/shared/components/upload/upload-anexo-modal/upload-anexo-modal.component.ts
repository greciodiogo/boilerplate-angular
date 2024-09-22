import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload-anexo-modal',
  templateUrl: './upload-anexo-modal.component.html',
  styleUrls: ['./upload-anexo-modal.component.css'],
})
export class UploadAnexoModalComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef;
  @Input() is_modal: boolean = true;
  @Input() url: string = '';
  @Input() anexotable: string;
  @Input() name: string = 'modalUploadAnexo';
  @Input() anexotableId: string;
  @Input() items: any[] = [];
  @Output() public loadList = new EventEmitter<any>();

  files: any[] = [];
  public form: FormGroup;
  public submitted = false;
  loading: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    // console.log(this.items)
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      anexotable: [null],
      anexotable_id: [null],
      files: [''],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  public onReset() {
    this.submitted = false;
    this.form.reset();
    this.files = [];
  }

  onSubmit() {}

  changeFiles(e) {
    const type = e.type;
    if (this.files.length == 0) {
      this.files.push(e);
    } else {
      var valid = false;
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        if (file.type == type) {
          this.files[i].file = e.file;
          this.files[i].expiration = e.expiration;
          valid = true;
        }
      }
      if (!valid) {
        this.files.push(e);
      }
    }
  }
}
