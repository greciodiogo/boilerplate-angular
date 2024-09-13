import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackdropBlurComponent } from './backdrop-blur.component';

describe('BackdropBlurComponent', () => {
  let component: BackdropBlurComponent;
  let fixture: ComponentFixture<BackdropBlurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackdropBlurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackdropBlurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
