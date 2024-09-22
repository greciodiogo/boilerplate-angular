import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedefinirPasswordUserLogadoComponent } from './redefinir-password-user-logado.component';

describe('RedefinirPasswordUserLogadoComponent', () => {
  let component: RedefinirPasswordUserLogadoComponent;
  let fixture: ComponentFixture<RedefinirPasswordUserLogadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedefinirPasswordUserLogadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedefinirPasswordUserLogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
