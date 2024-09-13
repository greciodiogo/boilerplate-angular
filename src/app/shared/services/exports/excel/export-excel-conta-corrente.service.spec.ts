import { TestBed } from '@angular/core/testing';

import { ExportExcelContaCorrenteService } from './export-excel-conta-corrente.service';

describe('ExportExcelContaCorrenteService', () => {
  let service: ExportExcelContaCorrenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportExcelContaCorrenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
