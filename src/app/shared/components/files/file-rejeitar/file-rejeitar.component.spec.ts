import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileRejeitarComponent } from './file-rejeitar.component';

describe('FileRejeitarComponent', () => {
  let component: FileRejeitarComponent;
  let fixture: ComponentFixture<FileRejeitarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileRejeitarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileRejeitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
