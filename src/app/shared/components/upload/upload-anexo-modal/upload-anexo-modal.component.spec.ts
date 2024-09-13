import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAnexoModalComponent } from './upload-anexo-modal.component';

describe('UploadAnexoModalComponent', () => {
  let component: UploadAnexoModalComponent;
  let fixture: ComponentFixture<UploadAnexoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadAnexoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAnexoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
