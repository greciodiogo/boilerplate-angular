import { Component, OnInit, Input, EventEmitter, Output, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormService } from '@app/shared/services/form.service';


@Component({
  selector: 'app-file-rejeitar',
  templateUrl: './file-rejeitar.component.html',
  styleUrls: ['./file-rejeitar.component.css']
})
export class FileRejeitarComponent implements OnInit {
  @Input() CaixaEstacionar: any = [];
  @Input() formCaixa: FormGroup;
  @Output() public loadLister = new EventEmitter<any>();
  @ViewChild('closeModal') closeModal: ElementRef;
 

  submitted = false;
  simpleForm: FormGroup;
  loading: boolean = false;
  validar = true;
  public motivos = [];
  public tipoOperacao: any;

  constructor(
    private formBuilder: FormBuilder,public formService: FormService){
    this.createForm();
  }

  ngOnInit() {
    this.getGenergetMotivoAnexoByAreas()
  }

  createForm() {
    this.simpleForm = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      description: [null],
      anexo_motivo_id: [null, Validators.required]
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
    // TODO: usado para fazer a requisição com a api de criação de object
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: `Tem Certeza que Deseja Rejeitar Este Documento ?`,
      text: "Rejeitar Documento!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, Rejeitar!',
      cancelButtonText: 'Não, Cancelar!',
      reverseButtons: true
    }).then((result) => {})
  }


  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (this.CaixaEstacionar) {
      this.simpleForm.patchValue({
        id: this.CaixaEstacionar.id
      });
    }

  }

  public getGenergetMotivoAnexoByAreas() {
    this.formService.getMotivoAnexoByArea('Financeira').pipe().subscribe((response) => {
      this.motivos = response;
    });
  }

  public rejeitarDocumento(){
    if ( this.tipoOperacao.tipoMovimento == "AdiantamentoSolicitacao") {
      this.RejeitarSolicitacao(this.tipoOperacao.movimentoId , this.tipoOperacao.transacaoId);
    }
    if ( this.tipoOperacao.tipoMovimento == "DepositoCaixa") {
     this.rejeitarDepositoCaixa(this.tipoOperacao.movimentoId ,this.tipoOperacao.lojaId ,this.tipoOperacao.transacaoId);
    }
  }

  public getDocumento(file:any) {
     this.tipoOperacao = file;
  }

  public RejeitarSolicitacao(solicitacaoId:any , transacao_id:any) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: `Tem Certeza que Deseja Rejeitar Este Documento ?`,
      text: "Rejeitar Documento!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, Rejeitar!',
      cancelButtonText: 'Não, Cancelar!',
      reverseButtons: true
    }).then((result) => {})
  }

  public rejeitarDepositoCaixa(deposito_id,loja_id,transacao_id ) {
    var motivos =  this.simpleForm.value.description;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: `Tem Certeza que Deseja Rejeitar Este Documento ?`,
      text: "Rejeitar Documento!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, Rejeitar!',
      cancelButtonText: 'Não, Cancelar!',
      reverseButtons: true
    }).then((result) => {})
      
    }
}
