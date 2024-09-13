import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFileUploadComponent } from './button-file-upload.component';

describe('ButtonFileUploadComponent', () => {
  let component: ButtonFileUploadComponent;
  let fixture: ComponentFixture<ButtonFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonFileUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
