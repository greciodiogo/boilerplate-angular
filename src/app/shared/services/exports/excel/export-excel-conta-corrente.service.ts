import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as Excel from 'exceljs/dist/exceljs.min.js';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelContaCorrenteService {
  workbook

  constructor() { }
  blobType: string =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  excels(
    data: any,
    excelname,
    key,
    col,
    title,
    headerNum,
    numLopp,
    imgSize,
    x,
    column_align = [],
    colocarResumoAbaixo: boolean = false,
    filtros = [],
    resumo
  ) {
    var footer = ['UNIG4TELCO'];
    var localDate = JSON.parse(localStorage.getItem('accessToken'));
    var workbook = new Excel.Workbook();
    workbook.creator = 'Web';
    workbook.lastModifiedBy = 'Web';
    workbook.created = new Date();
    workbook.modified = new Date();

    workbook.addWorksheet(title, {
      views: [
        {
          state: 'frozen',
          ySplit: 15,
          xSplit: x,
          activeCell: 'C2',
          showGridLines: true,
        },
      ],
    });


    var sheet = workbook.getWorksheet(1);
    /*  var imageId1 = workbook.addImage({
        base64:img,
        extension:'png',
      }); */

    /*  if(imgSize>40){
        sheet.addImage(imageId1, {
        tl: { col: 0, row: 1.3 },
        ext: { width: 120, height:80 }
      })
      }else{
        sheet.addImage(imageId1, {
          tl: { col: 0, row: 1.3 },
          ext: { width: 110, height:80 }
        })
      } */

    sheet.getCell('G2').value = moment(new Date()).format("DD-MM-YYYY HH:mm:ss");
    sheet.getCell('G1').value = localDate.user.name;
    sheet.getCell('B3').value = title;

    if (filtros.length > 0) {
      var contCell = 8;
      sheet.getCell('A6').value = "FILTRAGEM POR:";
      for (let indexFiltros = 0; indexFiltros < filtros.length; indexFiltros++) {
        sheet.getCell('A' + contCell).value = filtros[indexFiltros].name.replace(/_/g, " ").toUpperCase();
        sheet.getCell('B' + contCell).value = filtros[indexFiltros].value;
        contCell++;

      }
    }


    //sheet.getCell('A1').value = " "
    /*  sheet.getCell('A2').value = " "
      sheet.getCell('A3').value = " "

      sheet.getCell('A4').value = " "
      sheet.getCell('D2').value = " "
      if(x>=5){
        sheet.mergeCells('B3','E3')
      }else{
        sheet.mergeCells('B3','C3')
      }
      */
    /*
      sheet.addBackgroundImage(imageId1); */
    sheet.addRow('');
    sheet.getRow(15).values = col;
    sheet.columns = key;
    sheet.getRow(15).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'ffffff' },
      size: 13,
    };

    /* sheet.getRow(3).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffffff' },
        size: 26
      } */

    sheet.addRows(data);

    sheet.addRow('').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'ffffff' },
      size: 20,
    };

    sheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      row.eachCell(function (cell, colNumber) {
        cell.font = {
          name: 'Arial',
          family: 2,
          bold: true,
          size: 20,
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        if (rowNumber < headerNum) {
          for (var i = 0; i < headerNum; i++) {
            sheet.getRow(i).fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'ffffff' },
              size: 20,
            };
          }
        }

        if (rowNumber <= headerNum + 1) {
          row.height = 20;
          cell.font = {
            bold: true,
            size: 20,
            color: { argb: '02507C' },
          };
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
          };
        }

        if (rowNumber >= headerNum) {
          for (var i = 1; i < numLopp + 1; i++) {
            if (rowNumber < headerNum) {
              cell.font = {
                color: { argb: '02507C' },
                bold: true,
                size: 14,
              };
              row.height = 25;
              row.getCell(i).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'ffffff' },
              };

              cell.alignment = {
                vertical: 'middle',
                horizontal: 'center',
              };
            }
            if (rowNumber == headerNum && rowNumber < headerNum + 1) {
              cell.font = {
                color: { argb: 'ffffff' },
                bold: true,
                size: 14,
              };
              row.height = 25;
              row.getCell(i).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '02507C' },
              };

              cell.alignment = {
                vertical: 'middle',
                horizontal: 'center',
              };
            } else {
              row.getCell(i).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'ffffff' },
              };

              cell.font = {
                color: { argb: '2e2e2f' },
                bold: false,
                size: 12,
              };
              cell.alignment = {
                vertical: 'middle',
                horizontal: 'center',
              };
            }

            row.getCell(i).border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          }
        }

        if (rowNumber >= 6) {
          /*  for (let index = 0; index < column_align.length; index++) {
                const element = column_align[index];
                console.log(element)
                row.getCell(element).alignment = {
                  vertical: 'middle', horizontal: 'right', 'color': { 'argb': 'FFFF6600' }
                };
              }*/

          column_align.map((key) => {
            row.getCell(key).alignment = {
              vertical: 'middle',
              horizontal: 'right',
              color: { argb: 'FFFF6600' },
            };
          });
        }
      });
    });

    //resumo abaixo
    if (colocarResumoAbaixo) {
      const linhaResumo = headerNum + data.length + 5;
      const totalCarteiraResumo = 'C';
      const totalDividaCarteiraResumo = 'E';
      const totalDividaBonus = 'I';
      const totalBonus = 'G';

      // --------------------------------------------

      const valorTotalCarteiraResumo = 'D';
      const valorTotalDividaCarteiraResumo = 'F';
      const valorTotalBonus = 'H';
      const valorTotalDividaBonus = 'J';

      const rowResumo = sheet.getRow(linhaResumo);
      rowResumo.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffffff' },
        size: 13,
      };

      const tamanhoTitulo = 20;
      const letrasTituloResumo = ['C', 'E', 'G', 'I'];
      for (let cadaT of letrasTituloResumo) {
        sheet.getCell(cadaT + linhaResumo).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'ff0000' },
          size: 13,
        };
        sheet.getCell(cadaT + linhaResumo).font = {
          bold: true,
          size: tamanhoTitulo,
          color: { argb: 'ffffff' },
        };

        sheet.getCell(cadaT + linhaResumo).alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      }

      const tamanhoValor = 20;
      const letrasValorResumo = ['D', 'F', 'H', 'J'];
      for (let cadaT of letrasValorResumo) {
        sheet.getCell(cadaT + linhaResumo).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'ffffff' },
          size: 13,
        };
        sheet.getCell(cadaT + linhaResumo).font = {
          bold: true,
          size: tamanhoValor,
          color: { argb: '000000' },
        };

        sheet.getCell(cadaT + linhaResumo).alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      }
      sheet.getCell(totalCarteiraResumo + linhaResumo).value =
        'TOTAL CARTEIRA :';

      sheet.getCell(valorTotalCarteiraResumo + linhaResumo).value = 0;

      sheet.getCell(totalDividaCarteiraResumo + linhaResumo).value =
        'TOTAL DIVIDA CARTEIRA :';

      sheet.getCell(valorTotalDividaCarteiraResumo + linhaResumo).value = 0;

      sheet.getCell(totalBonus + linhaResumo).value = 'TOTAL BÔNUS :';
      sheet.getCell(valorTotalBonus + linhaResumo).value = 0;

      sheet.getCell(totalDividaBonus + linhaResumo).value =
        'TOTAL DIVIDA BÔNUS :';

      sheet.getCell(valorTotalDividaBonus + linhaResumo).value = 0;
    }
  /*  var referenci = 'A'+(sheet.rowCount + 5);
    console.log(referenci) */
    sheet.addTable({
      name: 'MyTable',
      displayName: 'My Test Table',
      ref: 'M8',
      headerRow: true,
      totalsRow: false,
      style: {
           theme: 'TableStyleLight1',
           showRowStripes: true,
      },
      columns: [
          {
              name: 'Resumo',
              filterButton: true
          },
         {
              name: 'Total',
              filterButton: true
         },
      ],
      rows: [
        ['Total Factura/Recibo', resumo.totalFacturadoFacturaRecibo],
        ['Total Factura', (resumo.totalFacturado)],
        ['Total Recebido', resumo.totalRecebido],
        ['Total Em Dívida', resumo.totalDivida]
      ],
   })
    /*
      sheet.addRow(footer) */
    //gera-o no formato execel
    workbook.xlsx.writeBuffer().then((Data) => {
      var blob = new Blob([Data], { type: this.blobType });

      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = excelname;
      a.click();
    });
  }
}
