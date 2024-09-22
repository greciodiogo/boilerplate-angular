import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarModulosSubmodulosComponent } from './associar-modulos-submodulos.component';

describe('AssociarModulosSubmodulosComponent', () => {
  let component: AssociarModulosSubmodulosComponent;
  let fixture: ComponentFixture<AssociarModulosSubmodulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociarModulosSubmodulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociarModulosSubmodulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
