import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AnexosService } from '@app/resources/Modules/09Anexos/services/anexos.service';
import { TransacaobancariaService } from '@app/resources/Modules/11Financas/services/transacaobancaria.service';
import { AdiantamentoSolicitacaoService } from '@app/resources/Modules/01CRM/services/adiantamento-solicitacao.service';
import { DepositocaixasService } from '@app/resources/Modules/03Operacoes/02Caixas/services/depositocaixas.service';
import { FormService } from '@app/shared/services/form.service';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { FileRejeitarComponent } from '../file-rejeitar/file-rejeitar.component';
declare var $: any;

@Component({
  selector: 'app-open-file',
  templateUrl: './open-file.component.html',
  styleUrls: ['./open-file.component.css']
})
export class OpenFileComponent implements OnInit {
  @Output() private loadList = new EventEmitter<any>();
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild(FileRejeitarComponent, { static: true }) public fileRejeitar: FileRejeitarComponent;

  public tipoOperacao = {
    tipoMovimento: null,
    movimentoId: null,
    transacaoId: null, 
    lojaId:null
  }
  public estado;
  public motivo;

  constructor(
    public anexosService: AnexosService,
    public depositocaixasService: DepositocaixasService,
    public adiantamentoSolicitacaoService: AdiantamentoSolicitacaoService,
    public transacaobancariaService: TransacaobancariaService,
    public formService: FormService
  ) { }

  ngOnInit(): void {
  }

  openApp(format, data): void {
    const type = format == 'png' || format == 'jpg' || format == 'jpeg' || format == 'PNG' || format == 'JPG' || format == 'JPEG' ? 'image' : format == 'txt' ? 'text' : 'application';
    var file = new Blob([data], { type: `${type}/${format}` });
    var documentBlobObjectUrl = URL.createObjectURL(file);
    $("#pdf_preview2").attr('src', documentBlobObjectUrl);
    $('#myModalOpenApp').modal('show');
  }

  public readAnexoPreview(filename, formate, estado,motivo={}) {
    console.log(motivo)
    this.estado = estado
    this.motivo = motivo;
    this.anexosService.loading = true;
    this.anexosService.anexoPreview(filename).subscribe(
      (data) => {
        this.openApp(formate, data)
        this.anexosService.loading = false;
      },
      (error) => {
        this.anexosService.loading = false;
      }
    );
  }

  public aprovarTypeDocument(tipoMovimento, movimentoId, transacaoId ,lojaId) {
    this.tipoOperacao.tipoMovimento = tipoMovimento;
    this.tipoOperacao.movimentoId = movimentoId;
    this.tipoOperacao.transacaoId = transacaoId;
    this.tipoOperacao.lojaId = lojaId;
  }

  public aprovarDocumento(){
    if ( this.tipoOperacao.tipoMovimento == "AdiantamentoSolicitacao") {
      this.AprovarSolicitacao(this.tipoOperacao.movimentoId , this.tipoOperacao.transacaoId);
    }
    if ( this.tipoOperacao.tipoMovimento == "DepositoCaixa") {
      this.aprovarDepositoCaixa(this.tipoOperacao.movimentoId ,this.tipoOperacao.lojaId ,this.tipoOperacao.transacaoId);
    }
  }

  public AprovarSolicitacao(solicitacaoId: any,transacaoId: any ) {

    this.swalWithBootstrapButtons.fire({
      title: 'Tem Certeza quer aprovar o Adiantamento?',
      text: "Aprovação de adiantamento",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'SIM',
      cancelButtonText: 'Não, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.adiantamentoSolicitacaoService.Aprovarsolicitacao(solicitacaoId, transacaoId).subscribe(
          (data) => {
            this.closeModal.nativeElement.click();
            this.loadList.emit(Object(data).data);
          },
          (error) => {
          }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.swalWithBootstrapButtons.fire(
          'Operação Cancelada',
          '',
          'error'
        )
      }
    })
  }

  

  public aprovarDepositoCaixa(deposito_id, loja_id , transacaoId) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: `Tem Certeza que Deseja Aprovar Este Depósito ?`,
      text: "Aprovar Depósitos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, Aprovar!',
      cancelButtonText: 'Não, Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.depositocaixasService.aprovarDepositoCaixa(deposito_id,loja_id,transacaoId).subscribe(
          (response) => {
           this.closeModal.nativeElement.click();
           this.loadList.emit(Object(response).data);
          },
          (error) => {
            this.depositocaixasService.loading = false;
          }
        );
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Operação Cancelada',
          '',
          'error'
        )
      }
    })
    
  }


  public swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  public close(){
    this.closeModal.nativeElement.click();
    this.loadList.emit();
  }

}
