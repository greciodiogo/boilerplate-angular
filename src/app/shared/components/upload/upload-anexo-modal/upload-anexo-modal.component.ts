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
import { AnexosService } from '@app/resources/Modules/09Anexos/services/anexos.service';
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
    public anexosService: AnexosService
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

  onSubmit() {
    this.submitted = true;

    // parar aquei se o formulário for inválido
    if (this.form.invalid) {
      return;
    }
    const id = this.form.getRawValue().id;
    this.form.patchValue({ files: this.files });
    this.form.patchValue({ anexotable: this.anexotable });
    this.form.patchValue({ anexotable_id: this.anexotableId });
    this.loading = true;
    // TODO: usado para fazer a requisição com a api de criação de object
    this.anexosService
      .submeterDocumento(this.url, this.form.value)
      .pipe(
        first(),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        (response) => {
          this.submitted = false;
          this.onReset();
          this.loadList.emit(response);
          this.closeModal.nativeElement.click();
        },
        (error) => {
          this.submitted = false;
          this.loading = false;
        }
      );
  }

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
