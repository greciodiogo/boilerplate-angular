import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosPermissoesComponent } from './modulos-permissoes.component';

describe('ModulosPermissoesComponent', () => {
  let component: ModulosPermissoesComponent;
  let fixture: ComponentFixture<ModulosPermissoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulosPermissoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulosPermissoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
