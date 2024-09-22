import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChange,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermissionService } from '@app/Modules/06Security/01Acl/services/permission.service';
import { first } from 'rxjs/operators';
import { Permission } from '../../models/Permission';
import { FormService } from '@app/shared/services/form.service';

@Component({
  selector: 'app-permission-form-create-or-edit',
  templateUrl: './permission-form-create-or-edit.component.html',
  styleUrls: ['./permission-form-create-or-edit.component.css']
})
export class PermissionFormCreateOrEditComponent implements OnInit, OnChanges {

  @Input() is_modal: boolean = false;
  @Input() title: string = 'Registar Permissão';
  @Input() permission: Permission = new Permission();
  @Input() simpleFormPermission: FormGroup;
  @Output() private loadList = new EventEmitter<any>();
  cor_icone: any = "#ffffff";
  cor_fundo_icone: any = "#ffffff";
  cor_fundo_permissao: any = "#ffffff";
  cor_texto_permissao: any = "#ffffff";
  textoSlug: any
  e_permissao_dentro_outra: boolean
  entidade_relacionada: string

  permissions: any = [];

  submitted = false;

  entidades = [
    {
      nome: "user"
    },
    {
      nome: "tipo-cliente"
    },
    {
      nome: "tipo-identidade"
    },
    {
      nome: "identidade"
    },
    {
      nome: "banco"
    },
    {
      nome: "imposto"
    },
    {
      nome: "produto"
    },
    {
      nome: "pagamento"
    },
    {
      nome: "direccao"
    },
    {
      nome: "moeda"
    },
    {
      nome: "cdma-modelo"
    },
    {
      nome: "permissions"
    },
    {
      nome: "perfil"
    },
    {
      nome: "Perfil-user"
    },
    {
      nome: "log"
    },
    {
      nome: "cliente"
    },
    {
      nome: "conta"
    },
    {
      nome: "contrato"
    },
    {
      nome: "documento"
    },
    {
      nome: "forma-pagamento"
    },
    {
      nome: "factura"
    },
    {
      nome: "linha-factura"
    },
    {
      nome: "linha-pagamento"
    },
    {
      nome: "pais"
    },
    {
      nome: "provincia"
    },
    {
      nome: "recibo"
    },
    {
      nome: "referencia-bancaria"
    },
    {
      nome: "factura"
    },
    {
      nome: "factura-banco"
    },
    {
      nome: "linha-recibo"
    },
    {
      nome: "empresa-config"
    },
    {
      nome: "empresa-config"
    },
    {
      nome: "empresa-config"
    },
    {
      nome: "pagamento"
    },
    {
      nome: "owner"
    },
    {
      nome: "armazen"
    },
    {
      nome: "tipo-movimento-stock"
    },
    {
      nome: "dataint-sap-log"
    },
    {
      nome: "dataint-vendas-sap"
    },
    {
      nome: "entrada-manual-mercadoria"
    },
    {
      nome: "movimento-stocks"
    },
    {
      nome: "motivo-devolucao"
    },
    {
      nome: "motivo-entrada-mercadoria"
    },
    {
      nome: "dataint-sap-cpr-mercadoria"
    },
    {
      nome: "dataint-financeira-saps"
    },
    {
      nome: "stoke-movimento"
    },
    {
      nome: "devolucao-header"
    },
    {
      nome: "empresa-config"
    },
    {
      nome: "user"
    },
    {
      nome: "tarifario"
    },
    {
      nome: "produto-unidade"
    },
    {
      nome: "imposto"
    },
    {
      nome: "genero"
    },
    {
      nome: "cambio"
    },
    {
      nome: "factura"
    },
    {
      nome: "banco"
    },
    {
      nome: "saft"
    },
    {
      nome: "alter-data-int-sap-mercadoria"
    },
    {
      nome: "add-field-devolucao-header"
    },
    {
      nome: "dataint-sap-cpr-mercadorias"
    },
    {
      nome: "pedido-produto"
    },
    {
      nome: "serie"
    },
    {
      nome: "movimento-stocks"
    },
    {
      nome: "municipio"
    },
    {
      nome: "distrito"
    },
    {
      nome: "anexo"
    },
    {
      nome: "conta-bancaria"
    },
    {
      nome: "tipo-anexo"
    },
    {
      nome: "estado-civil"
    },
    {
      nome: "tpa"
    },
    {
      nome: "config-documentacao-tipo-cliente"
    },
    {
      nome: "tipo-entidade-cativadora"
    },
    {
      nome: "entidade-cativadora"
    },
    {
      nome: "anexo"
    },
    {
      nome: "entidade-cativadora"
    },
    {
      nome: "anexo"
    },
    {
      nome: "gestor-cliente"
    },
    {
      nome: "banco"
    },
    {
      nome: "banco"
    },
    {
      nome: "tecnologia"
    },
    {
      nome: "loja"
    },
    {
      nome: "loja"
    },
    {
      nome: "caixa"
    },
    {
      nome: "filial"
    },
    {
      nome: "referencia-bancaria"
    },
    {
      nome: "numeracoes-origen"
    },
    {
      nome: "numeracoe"
    },
    {
      nome: "user"
    },
    {
      nome: "loja-chefe"
    },
    {
      nome: "adiantamento"
    },
    {
      nome: "movimento-adiantamento"
    },
    {
      nome: "recibo"
    },
    {
      nome: "factura"
    },
    {
      nome: "forma-pagamento"
    },
    {
      nome: "tarifario"
    },
    {
      nome: "user"
    },
    {
      nome: "loja-abertura"
    },
    {
      nome: "tipo-anexo-cliente"
    },
    {
      nome: "servico"
    },
    {
      nome: "tipo-identidade"
    },
    {
      nome: "tipo-facturacao"
    },
    {
      nome: "endereco"
    },
    {
      nome: "estado-servico"
    },
    {
      nome: "motivo-estado-servico"
    },
    {
      nome: "wimax"
    },
    {
      nome: "provision-huawei-aaa"
    },
    {
      nome: "provision-in"
    },
    {
      nome: "cdma-servico"
    },
    {
      nome: "lte-cpe"
    },
    {
      nome: "empresa-config"
    },
    {
      nome: "produto-categoria"
    },
    {
      nome: "produto-grupo"
    },
    {
      nome: "logs-acesso-detalhe-chamada"
    },
    {
      nome: "tarifario-plano-familia"
    },
    {
      nome: "tarifario-plano"
    },
    {
      nome: "motivo-carregamento"
    },
    {
      nome: "logs-carregamento"
    },
    {
      nome: "logs-change-account"
    },
    {
      nome: "logs-login"
    },
    {
      nome: "log-bill-run-saft"
    },
    {
      nome: "log-cdma-servico"
    },
    {
      nome: "charge"
    },
    {
      nome: "log-charge"
    },
    {
      nome: "log-desactivacao"
    },
    {
      nome: "log-estado-carregamento"
    },
    {
      nome: "log-estado-conta"
    },
    {
      nome: "pedido"
    },
    {
      nome: "tipo-pedido"
    },
    {
      nome: "estado-pedido"
    },
    {
      nome: "log-estado-pedido"
    },
    {
      nome: "tipo-reclamacao"
    },
    {
      nome: "estado-reclamacao"
    },
    {
      nome: "prioridade"
    },
    {
      nome: "reclamacao"
    },
    {
      nome: "log-estado-reclamacao"
    },
    {
      nome: "log-estado-servico"
    },
    {
      nome: "log-flat-rate"
    },
    {
      nome: "log-mudanca-conta-servico"
    },
    {
      nome: "log-operacoes-carregamento"
    },
    {
      nome: "estado-pedido-alteracao-estado-servico"
    },
    {
      nome: "log-pedido-alteracao-servico"
    },
    {
      nome: "log-unificacao"
    },
    {
      nome: "deposito-loja"
    },
    {
      nome: "loja-abertura"
    },
    {
      nome: "cdma-servico"
    },
    {
      nome: "loja"
    },
    {
      nome: "loja"
    },
    {
      nome: "gorgeta-user"
    },
    {
      nome: "numeracoes"
    },
    {
      nome: "adiantamento-solicitacao"
    },
    {
      nome: "cdma-equipamento"
    },
    {
      nome: "cdma-fabricante"
    },
    {
      nome: "sim-card"
    },
    {
      nome: "recarga-fisica"
    }
  ]

  opcoesModo = [
    { valor: "W", texto: "Escrita" },
    { valor: "R", texto: "Leitura" },
  ]

  tiposOperacoes = [
    { texto: "No Menu", valor: "M" },
    { texto: "Interna", valor: "I" },
    { texto: "Na Listagem", valor: "L" },
  ]

  constructor(
    public permissionService: PermissionService,
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.e_permissao_dentro_outra = false
    this.entidade_relacionada = ""
    this.permission = new Permission();
    this.listarPermisssoes();
  }

  createForm() {
    this.simpleFormPermission = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      name: [null, Validators.required],
      name_menu: [null, Validators.required],
      color_text_name: ["#000"],
      color_background_name: ["#FFF"],
      slug: [null, Validators.required],
      description: [null, Validators.required],
      is_crud: [false],
      icon: ["fa fa-plus"],
      color_icon: ["#FFF"],
      color_background_icon: ["#d51a2b"],
      route: [null],
      access_mode: [null],
      type_operation: [null],
      permission_id: [null],
      type_permission: ["A"],
      order: [1],

    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.simpleFormPermission.controls;
  }

  onReset() {
    this.permission = new Permission();
    this.submitted = false;
    this.simpleFormPermission.reset();
    this.createForm();
  }

  onSubmit() {
    this.submitted = true;

    // parar aquei se o formulário for inválido
    if (this.simpleFormPermission.invalid) {
      return;
    }
    const id = this.simpleFormPermission.getRawValue().id;
    // TODO: usado para fazer a requisição com a api de criação de objsct or update
    this.createOrEdit(this.simpleFormPermission, id === null ? true : false, id);
  }

  createOrEdit(formulario: FormGroup, isCreate: boolean = true, id) {
    // TODO: usado para fazer a requisição com a api de criação de object
    this.permissionService
      .storeOrUpdate(formulario.value, id)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          if (isCreate) {
            formulario.reset();
          }
          this.loadList.emit(Object(response).data);
        },
        (error) => {
          this.submitted = false;
          this.permissionService.loading = false;
        }
      );
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    this.entidade_relacionada = ""
    if (this.permission.id !== null && this.permission.id !== undefined) {
      this.title = 'Editar Permissão';
      this.simpleFormPermission.patchValue(this.permission);
    } else {
      this.title = 'Registar Permissão';
    }
  }

  setCrud(evento) {
    this.simpleFormPermission.value.is_crud = evento.target.checked ? true : false;
  }

  setSubPermissao(evento) {
    this.e_permissao_dentro_outra = evento.target.checked ? true : false;
  }

  listarPermisssoes() {
    this.formService.getPermissoesPorEntidadeRelacionada(this.entidade_relacionada).subscribe((response) => {
      this.permissions = response;
    });
  }

  preencherSlug(evento) {
    this.textoSlug = evento.target.value?.toLowerCase();
    this.textoSlug = this.textoSlug.replace(/\s/g, '-')//replace(/ /g, "-") : "";
    this.textoSlug = this.textoSlug ? this.textoSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, "") : "";
    this.simpleFormPermission.patchValue({
      slug: this.textoSlug,
      name_menu: evento.target.value,
      description: evento.target.value
    })


  }


}
