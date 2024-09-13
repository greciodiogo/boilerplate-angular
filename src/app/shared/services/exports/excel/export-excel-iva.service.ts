import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as Excel from 'exceljs/dist/exceljs.min.js';

@Injectable({
  providedIn: 'root',
})
export class ExportExcelIvaService {
  constructor() {}

  blobType: string =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  public ExcelExportIVA(
    Data_debitos: any,
    Data_creditos: any,
    filtros,
    excelFileName,
    totais
  ) {
    var footer = ['UNIG4TELCO'];
    var header = ['Imposto de Valor Acrescentado - DÉBITOS'];
    var header2 = ['Imposto de Valor Acrescentado - CRÉDITOS'];
    var header3 = ['Imposto de Valor Acrescentado - RESUMO'];

    var keys = [
      { key: 'nome', width: 25, style: { font: { name: 'Calibri' } } },
      { key: 'conta_id', width: 25, style: { font: { name: 'Calibri' } } },
      { key: 'direccao', width: 35 },
      { key: 'loja', width: 25 },
      { key: 'factura_sigla', width: 25, style: { font: { name: 'Calibri' } } },
      { key: 'created_at', width: 30, style: { numFmt: 'DD/MM/YYYY' } },
      { key: 'sigla', width: 20, style: { font: { name: 'Calibri' } } },
      { key: 'subtotal', width: 20, style: { numFmt: '#,##0.00' } },
      { key: 'totalImposto', width: 20, style: { numFmt: '#,##0.00' } },
      { key: 'total', width: 20, style: { numFmt: '#,##0.00' } },
    ];

    var keys2 = [
      { key: 'direccao', width: 30, style: { font: { name: 'Calibri' } } },
      { key: 'factura_sigla', width: 30 },
      { key: 'factura_sigla', width: 30 },
      { key: 'factura_sigla', width: 30 },
    ];
    var Cols = [
      'Cliente',
      'Nº Conta',
      'Direcção',
      'Loja',
      'Número Factura',
      'Data Factura',
      'Tipo Documento',
      'Valor Sem IVA',
      'IVA',
      'Valor Total',
    ];
    var Cols2 = ['Resumo', 'Valor Sem IVA', 'IVA', 'Total'];

    var workbook = new Excel.Workbook();
    workbook.creator = 'Web';
    workbook.lastModifiedBy = 'Web';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.addWorksheet('DÉBITOS', {
      views: [
        {
          state: 'frozen',
          ySplit: 6,
          xSplit: 2,
          activeCell: 'C2',
          showGridLines: true,
          dateFormats: ['DD/MM/YYYY'],
        },
      ],
    });
    workbook.addWorksheet('CRÉDITOS', {
      views: [
        {
          state: 'frozen',
          ySplit: 6,
          xSplit: 2,
          activeCell: 'C2',
          showGridLines: true,
        },
      ],
    });
    workbook.addWorksheet('RESUMO', {
      views: [
        {
          state: 'frozen',
          ySplit: 6,
          xSplit: 6,
          activeCell: 'C2',
          showGridLines: true,
        },
      ],
    });
    var sheet = workbook.getWorksheet(1);
    var sheet2 = workbook.getWorksheet(2);
    var sheet3 = workbook.getWorksheet(3);

    sheet2.addRow(header2);
    sheet.addRow(header);
    sheet3.addRow(header3);
    sheet.getCell('A1').font = {
      family: 4,
      name: 'Calibri',
      size: 25,
      bold: true,
      underline: true,
    };
    sheet2.getCell('A1').font = {
      family: 4,
      name: 'Calibri',
      size: 25,
      bold: true,
      underline: true,
    };
    sheet.addRow('');

    // sheet.getCell('A2').value =
    //   'Direcção: ' + (filtros.direccao == 'T' ? 'Todas' : filtros.direccao);
    // filtros.data1 == null
    //   ? ''
    //   : (sheet.getCell('A3').value =
    //       'Data: ' +
    //       (moment(filtros.data1).format('DD/MM/YYYY') +
    //         ' a ' +
    //         moment(filtros.data2).format('DD/MM/YYYY')));

    sheet.getRow(6).values = Cols;
    sheet2.getRow(6).values = Cols;
    sheet3.getRow(6).values = Cols2;

    sheet.columns = keys;
    sheet2.columns = keys;
    sheet3.columns = keys2;
    sheet.getRow(6).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'cccccc' },
    };

    sheet2.getRow(6).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'cccccc' },
    };
    sheet.addRows(Data_debitos);
    sheet2.addRows(Data_creditos);

    let totalRows: number = sheet.rowCount;
    totalRows = totalRows + 1;
    sheet.getCell('H' + totalRows).value = {
      formula: 'SUM(H7:H' + (totalRows - 1) + ')',
    };
    sheet.getCell('I' + totalRows).value = {
      formula: 'SUM(I7:I' + (totalRows - 1) + ')',
    };
    sheet.getCell('J' + totalRows).value = {
      formula: 'SUM(J7:J' + (totalRows - 1) + ')',
    };
    // sheet.getCell('K' + totalRows).value = {
    //   formula: 'SUM(K7:K' + (totalRows - 1) + ')',
    // };
    //let TOTAL_DEBITO =   sheet.getCell('E' + totalRows).value = { formula: 'SUM(E7:E' + (totalRows - 1) + ')' };
    //console.log(TOTAL_DEBITO);

    sheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      row.eachCell(function (cell, colNumber) {
        cell.font = {
          name: 'Arial',
          family: 2,
          bold: false,
          size: 10,
        };

        cell.alignment = {
          vertical: 'middle',
          horizontal: 'left',
        };
        if (rowNumber <= 6) {
          row.height = 20;
          cell.font = {
            bold: true,
          };
        }
        if (rowNumber >= 6) {
          //row.getCell(3).value = moment().format("MM/DD/YYYY h:mm:ss a");

          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
          };
          if (rowNumber >= 7) {
            row.getCell(8).alignment = {
              vertical: 'middle',
              horizontal: 'right',
              color: { argb: 'FFFF6600' },
            };
            row.getCell(9).alignment = {
              vertical: 'middle',
              horizontal: 'right',
              color: { argb: 'FFFF6600' },
            };
            row.getCell(10).alignment = {
              vertical: 'middle',
              horizontal: 'right',
              color: { argb: 'FFFF6600' },
            };

            row.getCell(11).alignment = {
              vertical: 'middle',
              horizontal: 'right',
              color: { argb: 'FFFF6600' },
            };
          }
          for (var i = 1; i < 11; i++) {
            if (rowNumber == 6) {
              cell.font = {
                color: { argb: 'FFFFFF' },
                bold: true,
              };
              row.height = 25;
              row.getCell(i).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '02507C' },
              };
            }
            row.getCell(i).border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };

            if (rowNumber == totalRows) {
              cell.font = {
                bold: true,
              };
              row.height = 25;

              sheet.getCell('A' + totalRows).value = 'TOTAL';
              sheet.getCell('A' + totalRows).font = {
                family: 3,
                name: 'Calibri',
                size: 11,
                bold: true,
              };
              sheet.getCell('A' + totalRows).alignment = {
                vertical: 'middle',
                horizontal: 'center',
              };
              //sheet.getCell('G'+totalRows).value = total;
              row.getCell(i).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'CCCCCC' },
              };
            }
          }
        }
      });
    });

    ///////////////////////  FORMAT SHEET 02 - CRÉDITOS ///////////////////////////////////////////////////////////
    totalRows = sheet2.rowCount;
    totalRows = totalRows + 1;
    sheet2.getCell('H' + totalRows).value = {
      formula: 'SUM(H7:H' + (totalRows - 1) + ')',
    };
    sheet2.getCell('I' + totalRows).value = {
      formula: 'SUM(I7:I' + (totalRows - 1) + ')',
    };
    sheet2.getCell('J' + totalRows).value = {
      formula: 'SUM(J7:J' + (totalRows - 1) + ')',
    };
    // sheet2.getCell('K' + totalRows).value = {
    //   formula: 'SUM(K7:K' + (totalRows - 1) + ')',
    // };

    // sheet2.getCell('A2').value =
    //   'Direcção: ' + (filtros.direccao == 'T' ? 'Todas' : filtros.direccao);
    // filtros.data1 == null
    //   ? ''
    //   : (sheet2.getCell('A3').value =
    //       'Data: ' +
    //       (moment(filtros.data2).format('DD/MM/YYYY') +
    //         ' a ' +
    //         moment(filtros.data1).format('DD/MM/YYYY')));

    sheet2.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      row.eachCell(function (cell, colNumber) {
        cell.font = {
          name: 'Arial',
          family: 2,
          bold: false,
          size: 10,
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'left',
        };
        if (rowNumber <= 6) {
          row.height = 20;
          cell.font = {
            bold: true,
          };
        }
        if (rowNumber >= 6) {
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
          };
          if (rowNumber >= 7) {
            row.getCell(8).alignment = {
              vertical: 'middle',
              horizontal: 'right',
              color: { argb: 'FFFF6600' },
            };
            row.getCell(9).alignment = {
              vertical: 'middle',
              horizontal: 'right',
              color: { argb: 'FFFF6600' },
            };
            row.getCell(10).alignment = {
              vertical: 'middle',
              horizontal: 'right',
              color: { argb: 'FFFF6600' },
            };

            row.getCell(11).alignment = {
              vertical: 'middle',
              horizontal: 'right',
              color: { argb: 'FFFF6600' },
            };
          }
          for (var i = 1; i < 11; i++) {
            if (rowNumber == 6) {
              cell.font = {
                color: { argb: 'FFFFFF' },
                bold: true,
              };
              row.height = 25;
              row.getCell(i).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '02507C' },
              };
            }
            row.getCell(i).border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };

            if (rowNumber == totalRows) {
              cell.font = {
                bold: true,
              };
              row.height = 25;

              sheet2.getCell('A' + totalRows).value = 'TOTAL';
              sheet2.getCell('A' + totalRows).font = {
                family: 3,
                name: 'Calibri',
                size: 11,
                bold: true,
              };
              sheet2.getCell('A' + totalRows).alignment = {
                vertical: 'middle',
                horizontal: 'center',
              };
              row.getCell(i).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'CCCCCC' },
              };
            }
          }
        }
      });
    });

    //// SHEET 03 RESUMO /////////

    totalRows = sheet3.rowCount;
    totalRows = totalRows + 1;

    // sheet3.getCell('A2').value =
    //   'Direcção: ' + (filtros.direccao == 'T' ? 'Todas' : filtros.direccao);
    // filtros.data1 == null
    //   ? ''
    //   : (sheet3.getCell('A3').value =
    //       'Data: ' +
    //       (moment(filtros.data2).format('DD/MM/YYYY') +
    //         ' a ' +
    //         moment(filtros.data1).format('DD/MM/YYYY')));

    sheet3.eachRow({ includeEmpty: true }, function (row, rowNumber) {
      row.eachCell(function (cell, colNumber) {
        cell.font = {
          name: 'Arial',
          family: 2,
          bold: true,
          size: 10,
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'left',
        };
        if (rowNumber <= 6) {
          row.height = 20;
          cell.font = {
            bold: true,
          };
        }
        if (rowNumber >= 6) {
          row.height = 20;
          cell.font = {
            bold: true,
          };
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
          };
          if (rowNumber >= 7) {
            row.getCell(2).alignment = {
              vertical: 'center',
              horizontal: 'right',
              bold: 'true',
              color: { argb: 'FFFF6600' },
            };
          }

          for (var i = 1; i < 5; i++) {
            if (rowNumber == 6) {
              cell.font = {
                color: { argb: 'FFFFFF' },
                bold: true,
              };
              row.height = 25;
              row.getCell(i).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '02507C' },
              };
            }

            sheet3.getCell('A7').value = 'DÉBITOS ';
            sheet3.getCell('A8').value = 'CRÉDITOS ';
            sheet3.getCell('A9').value = 'TOTAL ';

            sheet3.getCell('B7').value = totais.total_sem_iva;
            sheet3.getCell('B8').value = totais.total_sem_ivaCred;

            sheet3.getCell('C7').value = totais.total_iva;
            sheet3.getCell('C8').value = totais.total_ivaCred;

            sheet3.getCell('D7').value = totais.total;
            sheet3.getCell('D8').value = totais.totalCred;

            // sheet3.getCell('E7').value = totais.total;
            // sheet3.getCell('E8').value = totais.totalCred;

            sheet3.getCell('B9').value =
              totais.total_sem_iva - totais.total_sem_ivaCred;
            sheet3.getCell('C9').value =
              totais.total_iva - totais.total_ivaCred;
            sheet3.getCell('D9').value = totais.total - totais.totalCred;
            // sheet3.getCell('E9').value = totais.total - totais.totalCred;

            sheet3.getCell('A7').font = { bold: true };
            sheet3.getCell('A8').font = { bold: true };
            sheet3.getCell('A9').font = { bold: true };

            sheet3.getCell('B7').font = { bold: true };
            sheet3.getCell('B8').font = { bold: true };
            sheet3.getCell('B9').font = { bold: true };

            // sheet3.getCell('E7').font = { bold: true };
            // sheet3.getCell('E8').font = { bold: true };
            // sheet3.getCell('E9').font = { bold: true };

            sheet3.getCell('C7').font = { bold: true };
            sheet3.getCell('C8').font = { bold: true };
            sheet3.getCell('C9').font = { bold: true };
            sheet3.getCell('D7').font = { bold: true };
            sheet3.getCell('D8').font = { bold: true };
            sheet3.getCell('D9').font = { bold: true };

            sheet3.getCell('B7').fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'CCCCCC' },
            };
            sheet3.getCell('B8').fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'CCCCCC' },
            };

            sheet3.getCell('B9').fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'CCCCCC' },
            };

            // sheet3.getCell('E7').fill = {
            //   type: 'pattern',
            //   pattern: 'solid',
            //   fgColor: { argb: 'CCCCCC' },
            // };
            // sheet3.getCell('E8').fill = {
            //   type: 'pattern',
            //   pattern: 'solid',
            //   fgColor: { argb: 'CCCCCC' },
            // };

            // sheet3.getCell('E9').fill = {
            //   type: 'pattern',
            //   pattern: 'solid',
            //   fgColor: { argb: 'CCCCCC' },
            // };

            sheet3.getCell('C7').fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'CCCCCC' },
            };
            sheet3.getCell('C8').fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'CCCCCC' },
            };

            sheet3.getCell('C9').fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'CCCCCC' },
            };

            sheet3.getCell('D7').fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'CCCCCC' },
            };
            sheet3.getCell('D8').fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'CCCCCC' },
            };

            sheet3.getCell('D9').fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'CCCCCC' },
            };

            sheet3.getCell('D7').numFmt = '#,##0.00';
            sheet3.getCell('D8').numFmt = '#,##0.00';
            sheet3.getCell('D9').numFmt = '#,##0.00';
            sheet3.getCell('B7').numFmt = '#,##0.00';
            sheet3.getCell('B8').numFmt = '#,##0.00';
            sheet3.getCell('B9').numFmt = '#,##0.00';
            sheet3.getCell('C7').numFmt = '#,##0.00';
            sheet3.getCell('C8').numFmt = '#,##0.00';
            sheet3.getCell('C9').numFmt = '#,##0.00';
            // sheet3.getCell('E7').numFmt = '#,##0.00';
            // sheet3.getCell('E8').numFmt = '#,##0.00';
            // sheet3.getCell('E9').numFmt = '#,##0.00';

            sheet3.getCell('B8').border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
            sheet3.getCell('B9').border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
            sheet3.getCell('B7').border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
            sheet3.getCell('A7').border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
            sheet3.getCell('A8').border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
            sheet3.getCell('A9').border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };

            sheet3.getCell('C8').border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
            sheet3.getCell('C9').border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
            sheet3.getCell('C7').border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };

            sheet3.getCell('D8').border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
            sheet3.getCell('D9').border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
            sheet3.getCell('D7').border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
            // sheet3.getCell('E8').border = {
            //   top: { style: 'thin' },
            //   left: { style: 'thin' },
            //   bottom: { style: 'thin' },
            //   right: { style: 'thin' },
            // };
            // sheet3.getCell('E9').border = {
            //   top: { style: 'thin' },
            //   left: { style: 'thin' },
            //   bottom: { style: 'thin' },
            //   right: { style: 'thin' },
            // };
            // sheet3.getCell('E7').border = {
            //   top: { style: 'thin' },
            //   left: { style: 'thin' },
            //   bottom: { style: 'thin' },
            //   right: { style: 'thin' },
            // };

            row.getCell(i).border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          }
        }
      });
    });

    workbook.xlsx.writeBuffer().then((Data) => {
      var blob = new Blob([Data], { type: this.blobType });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = excelFileName;
      a.click();
    });
  }
}
