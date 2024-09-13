
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { RechargeService } from '../services/recharge.service';

@Component({
  selector: 'app-carregamento-voucher',
  templateUrl: './carregamento-voucher.component.html',
  styleUrls: ['./carregamento-voucher.component.css']
})
export class CarregamentoVoucherComponent implements OnInit {

  @Input() simpleForm: FormGroup;

  submitted = false;

  constructor(
    public rechargeService:RechargeService,
    public formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.simpleForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      costumerContact: [null, Validators.required],
      cardPinNumber: [null, Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.simpleForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.simpleForm.reset();
  }

  onSubmit() {
    this.submitted = true;

    // parar aquei se o formulário for inválido
    if (this.simpleForm.invalid) {
      return;
    }
    const id = this.simpleForm.getRawValue().id;
    // TODO: usado para fazer a requisição com a api de criação de objsct or update
    this.createOrEdit(this.simpleForm, id === null ? true : false, id);
  }

  createOrEdit(formulario: FormGroup, isCreate: boolean = true, id) {
    this.rechargeService.loading = true;
    // TODO: usado para fazer a requisição com a api de criação de object
    this.rechargeService
      .rechargesCard(formulario.value)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          if (isCreate) {
            formulario.reset();
          }
        },
        (error) => {
          this.submitted = false;
          this.rechargeService.loading = false;
        }
      );
  }

}
