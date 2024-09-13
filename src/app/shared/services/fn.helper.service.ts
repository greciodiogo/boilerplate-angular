import { EventEmitter, Injectable } from '@angular/core';
import { ApiService } from '@core/providers/api.service';
import { PermissionService } from '@app/core/security/authentication/permission.service';
import { AuthService } from '@app/core/security/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class FnService {
  public alertEvent = new EventEmitter();
  regexNumero = /^[0-9]+$/;

  public permission: PermissionService = new PermissionService(
    new AuthService(null, null, null)
  );
  constructor(private http: ApiService, public toasterService: ToastrService) { }

  public numberFormat(number) {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    })
      .format(number)
      .replace('€', '')
      .trim();
  }

  public  formatarQuantidade(numero) {
    // Converte o número para uma string
    let numeroFormatado = numero.toString();
    // Adiciona o separador de milhares
    numeroFormatado = numeroFormatado.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return numeroFormatado;
  }


  
  public numberExtenso(value) {
    var extenso = require('extenso');
    return this.toCapitalize(extenso('' + this.numberFormat(value), { locale: 'br', mode: 'currency', currency: { type: 'EUR' }, decimal: 'formal' }).replace('euros', 'Kwanzas'));
  }


  public showAlert(message: string, cls: string, show: boolean) {
    this.alertEvent.emit({ message: message, class: cls, show: show });
  }

  public calcularPercentualFact(f: any) {
    var calc = f.total - f.valor_aberto;
    return  parseFloat((f?.serie?.documento?.sigla == 'NC'
    ? 100
    : f.pago === 0 && f.status === 'N' && f.valor_aberto == null
      ? 0
      : (calc * 100) / f.total).toFixed(2))
  }

  public deleteElementRow(rows, key: string, value: any): any[] {
    for (let i = 0; i < rows.length; ++i) {
      if (rows[i][key] === value) {
        rows.splice(i, 1);
        return rows;
      }
    }
    return rows;
  }

  public mesPorExtenso(ano, mes) {
    var CurrentDate = new Date(ano + '-' + mes + '-01');
    return moment(CurrentDate).locale('pt-br').format('MMMM');
  }
  public years(start = 2019) {
    var fecha = new Date();
    var anyo = fecha.getFullYear();
    var anos: any = [];
    let j = 0;
    for (let i = start; i <= anyo; i++) {
      anos.push({ year: i });
      j++;
    }
    return anos;
  }
  public months() {
    var _months: any = [];
    for (let i = 1; i <= 12; i++) {
      const month = i;
      _months.push({
        id: (month <= 9 ? '0' + month : month).toString(),
        label: this.toCapitalize(this.mesPorExtenso(2019, month)),
      });
    }
    return _months;
  }

  toCapitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public millisToSeconds = (millis): number => {
    return (millis % 60000) / 1000;
  };

  public secondstoHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;
    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? '0' + v : v))
      .join(':');
  };

  public geraNumeroAleatoria(tamanho) {
    var stringAleatoria = '';
    var caracteres = '0123456789';
    for (var i = 0; i < tamanho; i++) {
      stringAleatoria += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    return stringAleatoria;
  }

  public diffDataJson(_new: Object, _old: Object, colummns = []): Array<Object> {
    //   colummns = [{
    //     key:'nome',
    //     value:'Nome Completo'
    //   },
    //   {
    //     key:'data_nascimento',
    //     value:'data nascimento'
    //   }
    // ]
    var _mudancas = [];
    var i = 0;
    const _new2 = Object.entries(_new);
    _old = _old == null ? _old : Object.entries(_old);
    for (var [key, value] of _new2) {
      var element = {
        checked: _old == null ? false : (_old[i][1] != value ? true : false),
        _old: _old == null ? { key: key, value: null } : ({ key: this.toCapitalize(_old[i][0]), value: _old[i][1] }),
        _new: { key: this.toCapitalize(key), value },
      }
      for (let i = 0; i < colummns.length; i++) {
        const colummn = colummns[i];
        if (this.toCapitalize(colummn.key) === element._new.key) {
          element._new.key = this.toCapitalize(colummn.value);
          element._old.key = this.toCapitalize(colummn.value);
        }
      }
      _mudancas.push(element);
      i++;
    }
    return _mudancas;
  }

  public async mergePdfBuffers(buffers: Uint8Array[]) {
    const PDFDocument = require('pdf-lib').PDFDocument;
    var pdfsToMerge = buffers
    const mergedPdf = await PDFDocument.create();
    for (const pdfBytes of pdfsToMerge) {
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }
    const pdfUrl = URL.createObjectURL(
      new Blob([await mergedPdf.save()], { type: 'application/pdf' }),
    );
    return pdfUrl;
  }

  public canActivateRouterLink(permission: string) {

    return this.permission.isOptionRouterLinkPermission(permission);
  }

  abrirModal(nomeDaModal) {
    $('#' + nomeDaModal).addClass("show");
    $('#' + nomeDaModal).attr("aria-modal", 'true');
    $('#' + nomeDaModal).toggle();
    let existeControloModal = false
    $(document).find("div").each(function () {
      if ($(this).hasClass("modal-backdrop") && $(this).hasClass("show")) {
        existeControloModal = true;
      }
    })

    $(document).find(".modal-backdrop").each(function () {
      $(this).remove();
    })

    for (let m = 0; m < this.getNumeroModasAbertas(); m++) {
      var $newdiv1 = $("<div class='modal-backdrop fade show'></div>")
      $("body").append($newdiv1)
    }

  }

  getNumeroModasAbertas() {
    let numeroModasAbertas = 0;
    $(document).find("div").each(function () {
      if ($(this).hasClass("modal") && $(this).hasClass("show")) {
        numeroModasAbertas++;
      }
    })

    return numeroModasAbertas;
  }

  fecharModal(nomeDaModal) {
    $('#' + nomeDaModal).toggle();
    $('#' + nomeDaModal).removeClass("show");
    $('#' + nomeDaModal).removeAttr("aria-modal");
    var divBackDropModal = $('body').children('div').last()

    if (this.getNumeroModasAbertas() == 1) {
      $("body").removeClass("modal-open");
    }

    $(document).find(".modal-backdrop").first().remove();

  }

  gerarNumerosSequenciaisApartirDeUmComeco(inicial, total) {
    let numerosGerados = []
    for (let ini = 1; ini <= total; ini++) {
      numerosGerados.push(inicial.toString())
      inicial = inicial + BigInt(1);
    }

    return numerosGerados;
  }

  public filterDatas() {
    // Declaração de variaveis
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("filter");
    filter = input.value.toUpperCase();
    table = document.getElementById("tabledata");
    tr = table.getElementsByTagName("tr");

    //Percorre toda a linha da tabela e esconde quem não foi encontrado na consulta
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  converterNumeroParaArray(numero) {
    if (numero < 1)
      return [];
    return Array.from(Array((numero)).keys())
  }

  verificarInsereiuNumero(chave){
    if (this.regexNumero.test(chave)) {
      return true;
    }

    return false
  }

  manipularTableResponsive(totalRegistosRetornados) {
    var tabela = document.getElementsByTagName("table");
    var divAcimaTabela = tabela?.length>0?tabela[0].closest("div"):null;
    if (divAcimaTabela && Number(totalRegistosRetornados) >= 5) {
      divAcimaTabela.classList.add('table-responsive');
    } else {
      divAcimaTabela.classList.remove('table-responsive');
    }
  }
  /**
   * @author Caniggia Moreira, caniggia.moreira@gmail.com
   * @deprecated "Converter cada primeira letra de cada palavra em maiúsculas"
   * @param str 
   * @returns 
   */
  strCapitalize(str):string{ 
    if (typeof str !== 'string') return '';
    return str.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
      return a.toUpperCase();
    });
  }
}
