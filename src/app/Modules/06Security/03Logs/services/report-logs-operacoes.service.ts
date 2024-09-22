import { Injectable, EventEmitter } from '@angular/core';
import autoTable from 'jspdf-autotable'

import * as moment from 'moment';
import * as jsPDF from 'jspdf';
var Buffer = require('buffer/').Buffer;
import { FnService } from '@app/shared/services/fn.helper.service';

@Injectable({
  providedIn: 'root',
})
export class PDFRelatorioLogsOperacoes {
  constructor(public configService: FnService) { }

  public imprimirPDFRelatorioLogsOperacoes(
    items: any = [],
    filtros: any,
    htmlTitle,
    logo: any,
    report: string = 'imprimir'
  ) 
  {
    var doc = new jsPDF.jsPDF('landscape');
    doc.setProperties({
      title: 'Recibos Pós-Pago',
      subject: 'Relatório',
      author: 'Unig',
      keywords: '',
      creator: 'AT',
    });

    var imgData =
    'data:image/png;base64,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';

    var logo_width = 30;
    var logo_height = 25;
    var posX = 10;
    var posY = 15;      
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var posy_Inicial = 9;
    var posX_Inicial = 11;
    const totalPagesExp = "{total_pages_count_string}";
    var data = new Date();
    var currentTime =
      '' +
      moment(data).format('DD') +
      '-' +
      moment(data).format('MM') +
      '-' +
      moment(data).format('YYYY') +
      '  ' +
      moment(data).format('H') +
      ':' +
      moment(data).format('m');

 

    cabecalhoItems(filtros)


    autoTable(doc,{ 
      html: '#logs-operacoes', 
      startY: 60,
      theme: 'grid',
      tableLineWidth: 0.3, 
      headStyles: {fillColor: [2, 80, 124], halign: 'center', valign: 'middle'}, 
      styles: {fontSize: 10, halign:'center', valign: 'middle', fillColor: [255,255,255]},
      margin: { bottom: 20, left: 10, right: 10 },
      bodyStyles: { fillColor: [255,255,255] },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 15 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        6: { cellWidth: 20 },
        7: { cellWidth: 30 },
        8: { cellWidth: 30 },
      }, 
    didDrawCell: function (data) {   
      // Add borders to all cells          
      // doc.autoTableSetDefaults({styles: {lineWidth: 0.1}});           
      doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);           
    },
    didDrawPage: (data) => {
      doc.setFontSize(11);
      // Go to page i
      // doc.setPage(i);
  
      var str = 'Página ' + data.doc.internal.getNumberOfPages() 
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      if (typeof doc.putTotalPages === 'function') { 
        str = str + ' de ' + totalPagesExp 
      } 
      doc.text(str, 10, 200); //data.settings.margin.left if you want it on the left
      doc.text('' + currentTime, pageWidth - 40, 200);
    // }
    },     
    didParseCell: (data) => {
      var rows = data.table.body;
      if (data.row.index === rows.length - 1) {
          data.cell.styles.fontSize = 11
          // data.cell.styles.fontStyle = "bold";
      }
    },
    columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  }
   )

   if (typeof doc.putTotalPages === 'function') {
    doc.putTotalPages(totalPagesExp);
  }

    if (report == 'imprimir') {
      doc.autoPrint();
      window.open('' + doc.output('bloburl'));
      return;
    } else if (report == 'buffer') {
      return new Buffer.from(doc.output('arraybuffer'));
    }





    function cabecalhoItems(filtros) {
      doc.addImage(
        imgData,
        'JPEG',
        pageWidth - 44,
        posY - 10,
        28, 
        18,
      );

      doc.setFontSize(40);
      doc.setFontSize(15);
      doc.setFont('', '', 'bold');
      doc.text('RELATÓRIO DE LOGS DE OPERCAÇÕES', posX, posY);

      var data = new Date();

      //Data de Impressão
      doc.setFontSize(18);
      doc.setFont('bold');
      doc.text(
        '' +
          data.getDate() +  
          '/' +
          (data.getUTCMonth() + 1) +
          '/' +
          data.getFullYear(),
        posX + 30,
        posY + 16
      );

      doc.setFont('', '', 'normal');
      doc.setFont('', '', 'Arial');

      doc.setFontSize(12);

      doc.text(`Tipo de Filtro: ${filtros[0]?.value || '----'}`, posX, posY + 30);
      doc.text(`Evento: ${filtros[3]?.value || '----'}`, posX + 60, posY + 30);
      doc.text(`Utilizador: ${filtros[2]?.value || '----'}`, posX + 123, posY + 30);
    }
  }

}