import { Injectable } from '@angular/core';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ExportExcelService {
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
          ySplit: filtros.length > 0 ? 15 : 5,
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
    sheet.getRow(filtros.length > 0 ? 15 : 5).values = col;
    sheet.columns = key;
    sheet.getRow(filtros.length > 0 ? 15 : 5).fill = {
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

    
    if(sheet.name == "MOVIMENTOS DE CAIXA"){
    const linhaTotais = headerNum + data.length;
      const letrasTituloTotais = ['G', 'H', 'I', 'J', 'K', 'L', 'M', 'N','O', 'P'];
      for (let cadaT of letrasTituloTotais) {
        sheet.getCell(cadaT + linhaTotais).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'efefef' },
          size: 13,
        };
        sheet.getCell(cadaT + linhaTotais).font = {
          bold: true,
          size: 12,
          color: { argb: '000000' },
        };
      }  
    }


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

      // sheet.getCell(totalBonus + linhaResumo).value = 'TOTAL BÔNUS :';
      // sheet.getCell(valorTotalBonus + linhaResumo).value = 0;

      // sheet.getCell(totalDividaBonus + linhaResumo).value =
      //   'TOTAL DIVIDA BÔNUS :';

      // sheet.getCell(valorTotalDividaBonus + linhaResumo).value = 0;
    }
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

  multitableexcels(
    data: any,
    excelname,
    img,
    key,
    col,
    title,
    headerNum,
    numLopp,
    imgSize,
    x,
    array = [],
    dates = [],
    titles = []
  ) {
    var footer = ['UNIG -[ UNIG4TELCO]'];
    var sheet1 = null;
    var sheet2 = null;
    var sheet = [sheet1, sheet2];

    var workbook = new Excel.Workbook();
    workbook.creator = 'Web';
    workbook.lastModifiedBy = 'Web';
    workbook.created = new Date();
    workbook.modified = new Date();

    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      const date = dates[index];

      workbook.addWorksheet(titles[index], {
        views: [
          {
            state: 'frozen',
            ySplit: 5,
            xSplit: x,
            activeCell: 'C2',
            showGridLines: true,
          },
        ],
      });
      sheet[index] = workbook.getWorksheet(index + 1);
      var imageId1 = workbook.addImage({
        base64: img,
        extension: 'png',
      });

      if (imgSize > 40) {
        sheet[index].addImage(imageId1, {
          tl: { col: 0, row: 1.3 },
          ext: { width: 120, height: 80 },
        });
      } else {
        sheet[index].addImage(imageId1, {
          tl: { col: 0, row: 1.3 },
          ext: { width: 110, height: 80 },
        });
      }

      sheet[index].getCell('A1').value = ' ';
      sheet[index].getCell('A2').value = ' ';
      sheet[index].getCell('A3').value = ' ';
      sheet[index].getCell('B3').value = title;
      sheet[index].getCell('A4').value = ' ';
      sheet[index].getCell('D2').value = ' ';
      if (x >= 5) {
        sheet[index].mergeCells('B3', 'E3');
      } else {
        sheet[index].mergeCells('B3', 'C3');
      }
      /*
      sheet[index] .addBackgroundImage(imageId1); */
      sheet[index].addRow('');
      sheet[index].getRow(5).values = col;
      sheet[index].columns = element;
      sheet[index].getRow(5).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffffff' },
        size: 16,
      };

      /* sheet[index] .getRow(3).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffffff' },
        size: 26
      } */

      sheet[index].addRows(date);

      sheet[index].addRow('').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffffff' },
        size: 26,
      };

      sheet[index].eachRow({ includeEmpty: true }, function (row, rowNumber) {
        row.eachCell(function (cell, colNumber) {
          cell.font = {
            name: 'Arial',
            family: 2,
            bold: true,
            size: 26,
          };
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
          };
          if (rowNumber < headerNum) {
            for (var i = 0; i < headerNum; i++) {
              sheet[index].getRow(i).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'ffffff' },
                size: 26,
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
        });
      });
      /*
      sheet[index] .addRow(footer) */
      //gera-o no formato execel
    }
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

  excelPersonalizado(opcoesDadosTabela, opcoesQtd, opcoesNomes, opcoesPosicoesView, opcoesImagem) {
    var footer = ['UNIG4TELCO'];
    var localDate = JSON.parse(localStorage.getItem('accessToken'));
    this.workbook = new Excel.Workbook();
    this.workbook.creator = 'Web';
    this.workbook.lastModifiedBy = 'Web';
    this.workbook.created = new Date();
    this.workbook.modified = new Date();

    this.workbook.addWorksheet(opcoesNomes.title, {
      views: [
        {
          state: 'frozen',
          ySplit: opcoesPosicoesView.ySplit,
          xSplit: opcoesPosicoesView.xSplit,
          activeCell: opcoesPosicoesView.activeCell,
          showGridLines: true,
        },
      ],
    });

    var sheet = this.workbook.getWorksheet(1); //Pegar a primeira folha
    const dadosDaEmpresa = localDate?.user?.empresa //{companyName,telefone,addressDetail,taxRegistrationNumber=NIF,buildingNumber=NIF,linha_apoio, logotipo, width,height}
    sheet.getCell('G2').value = moment(new Date()).format("DD-MM-YYYY HH:mm:ss");
    sheet.getCell('G1').value = localDate.user.name;
    sheet.getCell('B2').value = dadosDaEmpresa?.companyName;
    sheet.getCell('B3').value = opcoesNomes.title;

    if (opcoesDadosTabela.filtros.length > 0) {
      sheet = this.adicionarFiltrosNaSheet(sheet, opcoesQtd, opcoesDadosTabela)
    }

    sheet.addRow('');
    //Adiciona o cabecalho da tabela
    sheet = this.adicionarCabecalhoDaTabela(sheet, opcoesQtd, opcoesDadosTabela)

    sheet = this.adicionarConteudoLinhasDaTabela(sheet, opcoesDadosTabela);
    // if (opcoesImagem.isComLogo)
    //   this.colocarLogo(opcoesImagem.imgSize, img, sheet);

    // if (opcoesImagem.isComBackground)
    // sheet.addBackgroundImage(imageId1);

    sheet = this.manipularEstruturaLnhasCelulas(sheet, opcoesQtd.headerNum, opcoesQtd.numeroColunas);

    //resumo abaixo
    if (opcoesDadosTabela.colocarResumoAbaixo)
      sheet = this.colocarResumoPorBaixo(opcoesQtd.headerNum, opcoesDadosTabela.dados, sheet)

    /*
    sheet.addRow(footer) */

    //gerar o formato excel
    this.workbook.xlsx.writeBuffer().then((Data) => {
      var blob = new Blob([Data], { type: this.blobType });

      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = opcoesNomes.nameFile;
      a.click();
    });
  }

  adicionarFiltrosNaSheet(sheet, opcoesQtd, opcoesDadosTabela) {
    var contCell = opcoesQtd.linhaInicialFiltros;
    sheet.getCell('A'+(contCell-1)).font = { size: 18 };
    sheet.getCell('A'+(contCell-1)).value = "FILTRAGEM POR:";

    for (let indexFiltros = 0; indexFiltros < opcoesDadosTabela.filtros.length; indexFiltros++) {
      sheet.getCell('A' + contCell).font = { size: 16 };
      sheet.getCell('A' + contCell).value = opcoesDadosTabela.filtros[indexFiltros].name.replace(/_/g, " ").toUpperCase() + ":";
      sheet.getCell('B' + contCell).font = { size: 16 };
      sheet.getCell('B' + contCell).value = opcoesDadosTabela.filtros[indexFiltros].value;

      contCell++;
    }

    return sheet;
  }

  adicionarCabecalhoDaTabela(sheet, opcoesQtd, opcoesDadosTabela) {
    sheet.getRow(opcoesQtd.headerNum).values = opcoesDadosTabela.Cols;
    sheet.columns = opcoesDadosTabela.keys;
    sheet.getRow(opcoesQtd.headerNum).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'ffffff' },
      size: 13,
    };

    return sheet;
  }


  adicionarConteudoDaTabelaAddTable(sheet, opcoesQtd, opcoesDadosTabela, opcoesPosicoesView) {

    sheet.addTable({
      name: 'MyTable',
      ref: "A" + opcoesQtd?.headerNum,
      headerRow: true,
      totalsRow: false,
      style: {
        theme: null, //TableStyleDark3; "TableStyle[Shade][Number]", Shade, number:Light, 1-21, Medium, 1-28, Dark, 1-11
        showRowStripes: true,
        showColumnStripes: false,
        showFirstColumn: false,
        showLastColumn: false,
      },
      columns: opcoesDadosTabela.Cols,
      rows: opcoesDadosTabela.dados,

    });

    return sheet;
  }

  adicionarConteudoLinhasDaTabela(sheet, opcoesDadosTabela) {

    sheet.addRows(opcoesDadosTabela.dados); //Adiciona o conteúdo do excel

    return sheet;
  }

  manipularEstruturaLnhasCelulas(sheet, headerNum, numeroColunas) {
    sheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {

      row.eachCell(function (cell, colNumber) {

        cell.font = {
          name: 'Arial',
          family: 2,
        };

        if (rowNumber < headerNum) {
          row.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'ffffff' },
            size: 20,
          };

          cell.font = {
            bold: true,
            size: 18,
            color: { argb: '02507C' },
          };

          cell.alignment = {
            vertical: 'middle',
            horizontal: 'left',
          };
        }

        if (rowNumber == headerNum) {
          row.height = 25;
          cell.font = {
            bold: true,
            size: 16,
            color: { argb: 'ffffff' },
          };
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
          };

          cell.border = {
            top: { style: 'thin', },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };

          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '02507C' },
          };

        }

        if (rowNumber > headerNum) {
          row.height = 20;
          if (colNumber <= numeroColunas) {
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };

            cell.font = {
              color: { argb: '000000' },
              bold: false,
              size: 14,
            };

            cell.alignment = {
              vertical: 'middle',
              horizontal: 'center',
            };


            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'ffffff' },
            };

          }
        }
      });
    });

    return sheet;
  }

  colocarResumoPorBaixo(headerNum, dados, sheet) {
    const linhaResumo = headerNum + dados.length + 5;
    const totalCarteiraResumo = 'C';
    const totalDividaCarteiraResumo = 'E';
    const totalDividaBonus = 'I';
    const totalBonus = 'G';

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

    // sheet.getCell(totalBonus + linhaResumo).value = 'TOTAL BÔNUS :';
    // sheet.getCell(valorTotalBonus + linhaResumo).value = 0;

    // sheet.getCell(totalDividaBonus + linhaResumo).value =
    //   'TOTAL DIVIDA BÔNUS :';

    // sheet.getCell(valorTotalDividaBonus + linhaResumo).value = 0;

    return sheet;

  }

  colocarLogo(imgSize, img, sheet) {
    var imageId1 = this.workbook.addImage({
      base64: img,
      extension: 'png',
    });

    if (imgSize > 40) {
      sheet.addImage(imageId1, {
        tl: { col: 0, row: 1.3 },
        ext: { width: 120, height: 80 }
      })
    } else {
      sheet.addImage(imageId1, {
        tl: { col: 0, row: 1.3 },
        ext: { width: 110, height: 80 }
      })
    }
  }

  removerTextoDaLinhaDosTotaisDaTabela(sheet, arrayDadosDaTabela, linhaCabecalhoTabela) {
    sheet.getCell('A' + (linhaCabecalhoTabela + arrayDadosDaTabela?.length + 1)).value = '';
    sheet.getCell('A' + (linhaCabecalhoTabela + arrayDadosDaTabela?.length + 1)).border = { top: { style: 'thin' }, left: { style: 'thin', color: { argb: 'FFFFFFFF' } }, bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } }, right: { style: 'thin', color: { argb: 'FFFFFFFF' } } };
    return sheet;
  }

  excelPersonalizadoComAddTable(opcoesDadosTabela, opcoesQtd, opcoesNomes, opcoesPosicoesView, opcoesImagem) {
    var footer = ['UNIG4TELCO'];
    var localDate = JSON.parse(localStorage.getItem('accessToken'));
    this.workbook = new Excel.Workbook();
    this.workbook.creator = 'Web';
    this.workbook.lastModifiedBy = 'Web';
    this.workbook.created = new Date();
    this.workbook.modified = new Date();

    this.workbook.addWorksheet(opcoesNomes.title, {
      // {properties:{tabColor:{argb:'FFC0000'}},
      // headerFooter:{firstHeader: "Hello Exceljs", firstFooter: "Hello World"},
      // pageSetup:{paperSize: 9, orientation:'landscape'},
      // {properties:{outlineLevelCol:1},
      // pageSetup:{fitToPage: true, fitToHeight: 5, fitToWidth: 7}
      views: [
        {
          state: 'frozen',
          ySplit: opcoesPosicoesView.ySplit,
          xSplit: opcoesPosicoesView.xSplit,
          activeCell: opcoesPosicoesView.activeCell,
          showGridLines: true,
        },
      ],
    });

    var sheet = this.workbook.getWorksheet(1); //Pegar a primeira folha

    sheet.getCell('G2').value = moment(new Date()).format("DD-MM-YYYY HH:mm:ss");
    sheet.getCell('G1').value = localDate.user.name;
    sheet.getCell('B3').value = opcoesNomes.title;

    sheet.columns = opcoesDadosTabela.keys;

    if (opcoesDadosTabela.filtros.length > 0) {
      sheet = this.adicionarFiltrosNaSheet(sheet, opcoesQtd, opcoesDadosTabela)
    }

    sheet.addRow('');
    //Adiciona o cabecalho da tabela
    sheet = this.adicionarConteudoDaTabelaAddTable(sheet, opcoesQtd, opcoesDadosTabela, opcoesPosicoesView);

    // if (opcoesImagem.isComLogo)
    //   this.colocarLogo(opcoesImagem.imgSize, img, sheet);

    // if (opcoesImagem.isComBackground)
    // sheet.addBackgroundImage(imageId1);

    //resumo abaixo
    if (opcoesDadosTabela.colocarResumoAbaixo)
      sheet = this.colocarResumoPorBaixo(opcoesQtd.headerNum, opcoesDadosTabela.dados, sheet)

    /*
    sheet.addRow(footer) */

    sheet = this.manipularEstruturaLnhasCelulas(sheet, opcoesQtd.headerNum, opcoesQtd.numeroColunas);

    // sheet = this.removerTextoDaLinhaDosTotaisDaTabela(sheet, opcoesDadosTabela.dados, opcoesQtd.headerNum);

    //gerar o formato excel
    this.workbook.xlsx.writeBuffer().then((Data) => {
      var blob = new Blob([Data], { type: this.blobType });

      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = opcoesNomes.nameFile;
      a.click();
    });
  }


}
