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
import { first } from 'rxjs/operators';
import { Modulo } from '@app/Modules/06Security/01Acl/models/Modulo';
import { ModuloService } from '../../services/modulos.service';
import { HttpParams } from '@angular/common/http';
import { FormService } from '@app/shared/services/form.service';

@Component({
  selector: 'app-modulo-form-create-or-edit',
  templateUrl: './modulo-form-create-or-edit.component.html',
  styleUrls: ['./modulo-form-create-or-edit.component.css'],
})
export class ModuloFormCreateOrEditComponent implements OnInit {
  @Input() is_modal: boolean = false;
  @Input() title: string = 'Registprodutoar Módulo';
  @Input() modulo: Modulo = new Modulo();
  @Input() simpleFormModulo: FormGroup;
  @Output() private loadList = new EventEmitter<any>();
  is_principal: boolean;
  modulos: any = [];
  modulosSubModulos: any = [];
  modulosSubModulosAux: any = [];
  modulo_ids: any = [];
  submitted = false;
  cor_icone: any = '#ffffff';
  cor_fundo_icone: any = '#ffffff';
  cor_fundo_nome: any = '#ffffff';
  cor_texto_nome: any = '#ffffff';
  textoSlug: any;
  tituloModuloSubModulo;
  ordemModuloSubModulo: any = [];
  texto_pesquisar_tabela;
  idsModulosSubModulo: any = [];
  permissoes: any = [];
  tem_permissao: boolean = false;
  pesquisar_permissao: string;
  regexNumero = /^[0-9]+$/;
  regexNumeroVirgulaEPonto = /^[0-9.,]+$/;
  textoNotificacaoValidarNumero;
  constructor(
    private formBuilder: FormBuilder,
    public moduloService: ModuloService,
    public formService: FormService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.is_principal = false;
    this.listarModulosESubModulos();
    this.tituloModuloSubModulo = 'Módulos a Associar';
  }

  determinarModulosSubModulosAMostrar() {
    if (!this.is_principal || undefined == this.is_principal) {
      this.modulosSubModulos = this.modulos;
    } else {
      this.modulosSubModulos = this.modulos.filter(
        (cada) => cada.is_principal == false
      );
    }
  }

  identificarOsSeleccionados() {
    for (let m of this.modulosSubModulos) {
      m['checked'] = this.verificarModuloSubModuloAssocado(m.id);
    }
  }

  createForm() {
    this.simpleFormModulo = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      nome: [null, Validators.required],
      nome_menu: [null, Validators.required],
      slug: [null, Validators.required],
      descricao: [null],
      is_principal: [false],
      cor_texto_nome: ['#000'],
      cor_fundo_nome: ['#FFF'],
      icone: [null],
      cor_icone: ['#FFF'],
      cor_fundo_icone: ['#d51a2b'],
      ordem: [1],
      modulo_id: [null],
      idsModulosSubModulo: [null],
      ordemModuloSubModulo: [null],
      permission_id: [null],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.simpleFormModulo.controls;
  }

  onReset() {
    this.modulo = new Modulo();
    this.submitted = false;
    this.simpleFormModulo.reset();
    this.createForm();
  }

  onSubmit() {
    this.simpleFormModulo.value.is_principal = this.is_principal;
    this.idsModulosSubModulo = this.idsModulosSubModulo.map((i) => Number(i));
    this.simpleFormModulo.value.idsModulosSubModulo = this.idsModulosSubModulo;
    this.simpleFormModulo.value.permission_id = this.tem_permissao
      ? this.simpleFormModulo.value.permission_id
      : null;
    this.pegarModuloSubModuloDoForm();
    this.submitted = true;
    // parar aqui se o formulário for inválido
    if (this.simpleFormModulo.invalid) {
      return;
    }
    // console.log("this.simpleFormModulo.value:" + JSON.stringify(this.simpleFormModulo.value))
    const id = this.simpleFormModulo.getRawValue().id;
    // TODO: usado para fazer a requisição com a api de criação de objsct or update

    this.createOrEdit(this.simpleFormModulo, id === null ? true : false, id);
  }

  pegarModuloSubModuloDoForm() {
    let idsModuloSubModulo = $('.idModuloSubModulo:checkbox:checked')
      .map(function () {
        return $(this).val();
      })
      .get();

    this.ordemModuloSubModulo = $('.ordemModuloSubModulo')
      .map(function () {
        return idsModuloSubModulo.indexOf($(this).attr('id')) > -1
          ? { ordem: $(this).val(), modulo_id: $(this).attr('id') }
          : {};
      })
      .get();

    idsModuloSubModulo = idsModuloSubModulo.map((i) => Number(i));

    this.simpleFormModulo.value.modulo_id = idsModuloSubModulo;

    this.ordemModuloSubModulo = this.ordemModuloSubModulo.filter(
      (cada) => cada.ordem != undefined
    );

    const ordemModuloSubModulos = this.ordemModuloSubModulo;

    this.ordemModuloSubModulo = [];
    for (let ord of ordemModuloSubModulos) {
      this.ordemModuloSubModulo.push({
        ordem: Number(ord.ordem),
        modulo_id: Number(ord.modulo_id),
      });
    }

    this.simpleFormModulo.value.ordemModuloSubModulo =
      this.ordemModuloSubModulo;
  }

  createOrEdit(formulario: FormGroup, isCreate: boolean = true, id) {
    // TODO: usado para fazer a requisição com a api de criação de object
    this.moduloService
      .storeOrUpdate(formulario.value, id)
      .pipe(first())
      .subscribe(
        (response) => {
          this.submitted = false;
          if (isCreate) {
            formulario.reset();
            $('.idModuloSubModulo').prop('checked', false);
          }
          this.loadList.emit(Object(response).data);
        },
        (error) => {
          this.submitted = false;
          this.moduloService.loading = false;
        }
      );
  }

  pegarModulosDoSubModulo(modulo) {
    if (modulo) {
      return modulo.idsModulosSubModulo?.map(function (m) {
        return m.modulo_id;
      });
    }
    return [];
  }

  pegarSubModulosDoModulo(modulo) {
    if (modulo && modulo.idsModulosSubModulo != undefined) {
      return modulo.idsModulosSubModulo.map(function (m) {
        return m.submodulo_id;
      });
    }
    return [];
  }

  pegarIdsDoModuloSubmduloSelecionado() {
    if (!this.is_principal)
      this.idsModulosSubModulo = this.pegarModulosDoSubModulo(this.modulo);
    else this.idsModulosSubModulo = this.pegarSubModulosDoModulo(this.modulo);
  }

  carregarDadosParaOFormulario() {
    this.tituloModuloSubModulo = !this.is_principal
      ? 'Módulos a Associar'
      : 'SubMódulos a Associar';
    this.determinarModulosSubModulosAMostrar();
    this.pegarIdsDoModuloSubmduloSelecionado();
    this.identificarOsSeleccionados();
  }

  ngOnChanges() {
    if (this.modulo) {
      this.title = 'Editar Módulo/SubMódulo';
      this.simpleFormModulo.patchValue(this.modulo);
      this.is_principal = this.modulo.is_principal;
      this.tem_permissao = this.modulo.permission_id == null ? false : true;
      if (this.tem_permissao) {
        this.getPermissoes();
      }
      this.carregarDadosParaOFormulario();
    } else {
      this.title = 'Registar Módulo/SubMódulo';
    }
  }

  setSubModulo(evento) {
    this.is_principal = evento.target.checked ? false : true;
    this.tituloModuloSubModulo = evento.target.checked
      ? 'Módulos a Associar'
      : 'SubMódulos a Associar';
    this.determinarModulosSubModulosAMostrar();
    this.identificarOsSeleccionados();
  }

  setTemPermissao(evento = null) {
    if (evento?.target.checked) {
      this.tem_permissao = true;
      this.simpleFormModulo.controls['permission_id']?.setValidators([
        Validators.required,
      ]);
    } else {
      this.tem_permissao = false;
      this.simpleFormModulo.controls['permission_id']?.setValidators([null]);
    }
    this.getPermissoes();
    this.simpleFormModulo.value.permission_id = this.tem_permissao
      ? this.simpleFormModulo.value.permission_id
      : null;
  }

  public listarModulosESubModulos() {
    var httpParams = new HttpParams().set(
      'filtro',
      $('#texto_pesquisar').val()?.toString()
    );
    this.formService.getTodosModulos(httpParams).subscribe((response) => {
      this.modulos = response;
      this.carregarDadosParaOFormulario();
    });
  }

  preencherSlug() {
    this.textoSlug = this.simpleFormModulo.value.nome;
    this.textoSlug = this.textoSlug
      ? this.simpleFormModulo.value.nome.toLowerCase().replace(/ /g, '-')
      : '';
    this.textoSlug = this.textoSlug
      ? this.textoSlug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      : '';
    this.simpleFormModulo.patchValue({
      slug: this.textoSlug,
      nome_menu: this.simpleFormModulo.value.nome,
      descricao: this.simpleFormModulo.value.nome,
    });
  }

  manipularTodosCheckBoxes(evento) {
    if (evento.target.checked) {
      $('.idModuloSubModulo').prop('checked', true);
    } else {
      $('.idModuloSubModulo').prop('checked', false);
    }
  }

  verificarModuloSubModuloAssocado(id_modulo) {
    return this.idsModulosSubModulo?.indexOf(id_modulo) > -1 ? true : false;
  }

  pegarOrdemModulosDoSubModulo(moduloSubmdulo_id) {
    let res;

    if (this.modulo) {
      if (!this.modulo.is_principal) {
        res = this.modulo.idsModulosSubModulo?.find(
          (cada) => cada.modulo_id == moduloSubmdulo_id
        );
      } else {
        res = this.modulo.idsModulosSubModulo?.find(
          (cada) => cada.submodulo_id == moduloSubmdulo_id
        );
      }
    }
    return res ? res.ordem : 1;
  }

  public getPermissoes() {
    this.formService.getPermissoes().subscribe((response) => {
      this.permissoes = response;
    });
  }

  public getPermissoesPorEntidadeRelacionada(evento = null) {
    evento?.preventDefault();
    this.moduloService.loading = true;
    this.formService
      .getPermissoesPorEntidadeRelacionada($('#pesquisar_permissao').val())
      .subscribe((response) => {
        this.permissoes = response;
        this.moduloService.loading = false;
      });
  }

  validarPosicaoPontoVirgulaAoSair(evento) {
    if (
      evento.target.value.lastIndexOf('.') == evento.target.value.length - 1 ||
      evento.target.value.lastIndexOf(',') == evento.target.value.length - 1 ||
      evento.target.value.split(',').length > 2
    ) {
      this.setarTextoDeNotificacao(
        evento,
        'Não é permitido ponto ou vírgula no fim'
      );
      $('#' + evento.target.id).focus();
    } else {
      this.pegaNovoValor(evento.target.value);
    }
  }

  pegaNovoValor(valorRecebido) {
    let novoValor = '';
    const novoValorAux = valorRecebido.split('.');
    for (let cadaParte of novoValorAux) {
      novoValor = novoValor + cadaParte;
    }
    novoValor = novoValor.replace(/,/g, '.');

    // console.log("novoValor:" + novoValor);

    return novoValor;
  }

  public validarNumeroRegexKeyPress2(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    if (!this.regexNumero.test(key)) {
      return false;
    }
    return true;
  }

  public validarNumeroKeyUp(evt) {
    this.setarTextoDeNotificacao(evt, '');
  }

  public validarNumeroRegexKeyPress(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var codigoTeclaPressionado = evt.which ? evt.which : theEvent.keyCode;
    const codigoTeclaPonto = 46;
    const codigoTeclaVirgula = 44;

    //não aceita Ponto ou vírgula Na Primeira Posição
    if (evt.target.value.length == 0 && !this.regexNumero.test(key)) {
      this.setarTextoDeNotificacao(
        evt,
        'Não é permitido ponto ou vírgula na primeira posição'
      );
      return false;
    }

    //aceita apenas Número, Ponto Ou Virgula
    if (!this.regexNumeroVirgulaEPonto.test(key)) {
      this.setarTextoDeNotificacao(evt, 'Só é permitido número');
      return false;
    }

    //Não aceita , ou . após .  ou ,
    if (
      (evt.target.value.lastIndexOf('.') == evt.target.value.length - 1 ||
        evt.target.value.lastIndexOf(',') == evt.target.value.length - 1) &&
      (codigoTeclaPressionado == codigoTeclaPonto ||
        codigoTeclaPressionado == codigoTeclaVirgula)
    ) {
      this.setarTextoDeNotificacao(evt, 'Carácter inserido não permitido');
      return false;
    }

    // Apenas 3 números após a vírgula
    if (
      evt.target.value.split(',').length > 1 &&
      evt.target.value.split(',')[1].length == 3
    ) {
      this.setarTextoDeNotificacao(
        evt,
        'Não é permitido três(3) algarismos após a vírgula'
      );
      return false;
    }

    // Apenas uma vírgula
    if (
      evt.target.value.indexOf(',') > -1 &&
      codigoTeclaPressionado == codigoTeclaVirgula
    ) {
      this.setarTextoDeNotificacao(evt, 'Não é permitido mais de uma vírgula');
      return false;
    }

    // Já não aceita ponto se encontrar vírgula
    if (
      evt.target.value.indexOf(',') > -1 &&
      codigoTeclaPressionado == codigoTeclaPonto
    ) {
      this.setarTextoDeNotificacao(
        evt,
        'Não é permitido inserir este carácter'
      );
      return false;
    }

    // Verifica sequencia de 3 números depois do ponto
    const partesInteira = evt.target.value.split(',');
    const posicaoUltimoPonto = evt.target.value.lastIndexOf('.');
    const ultimaParteMilhar = evt.target.value.substring(
      posicaoUltimoPonto + 1,
      partesInteira ? partesInteira[0].length : evt.target.value.length
    );
    if (posicaoUltimoPonto > -1) {
      if (
        ultimaParteMilhar.length == 3 &&
        evt.target.value.indexOf(',') == -1 &&
        codigoTeclaPressionado != codigoTeclaPonto &&
        codigoTeclaPressionado != codigoTeclaVirgula
      ) {
        this.setarTextoDeNotificacao(
          evt,
          'Não é permitido este dígito após três(3) seguidos'
        );
        return false;
      } else {
        if (
          ultimaParteMilhar.length < 3 &&
          (codigoTeclaPressionado == codigoTeclaPonto ||
            codigoTeclaPressionado == codigoTeclaVirgula)
        ) {
          this.setarTextoDeNotificacao(
            evt,
            'Não é permitido este dígito. Preencha três(3) seguidos apos .'
          );
          return false;
        }
      }
    }

    // Verifica insercão de ponto(.), mas não está a dividir o valor com milhares
    if (
      codigoTeclaPressionado == codigoTeclaPonto &&
      evt.target.value.indexOf('.') == -1 &&
      evt.target.value.length > 3
    ) {
      this.setarTextoDeNotificacao(evt, 'Não é permitido dividir em milhares');
      return false;
    }

    // Verifica inserção de ponto(.), depois do zero(0)
    if (codigoTeclaPressionado == codigoTeclaPonto && evt.target.value == 0) {
      this.setarTextoDeNotificacao(evt, 'Não é permitido milhares com zero');
      return false;
    }

    this.setarTextoDeNotificacao(evt, '');

    return true;
  }

  setarTextoDeNotificacao(evento, texto) {
    this.textoNotificacaoValidarNumero = texto;
    $('#' + evento.target.id)
      .parent()
      .find('.text-danger')
      .html(texto);
  }

  getQtdNumeroDepoisDoSinal(valor, sinal) {
    let partes = valor.split(sinal);
    if (partes.length > 0) {
      if (partes[partes.length - 1]?.length > 3) {
        return false;
      }
    }
  }

  verificaNumeroDeVezesPontoEvirgula(valor) {
    if (valor.split('.').length - 1 > 1 || valor.split(',').length - 1 > 1) {
      return false;
    }
  }

  verificaPontoEvirgulaNaPrimeiraPosicao(valor) {
    if (valor.charAt(0) == ',' || valor.charAt(0) == '.') return false;
  }

  verificaSeEhNumeroPontoOuVirgula(key) {
    if (!this.regexNumeroVirgulaEPonto.test(key)) {
      return false;
    }
  }
}
