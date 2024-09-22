import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociarPermissoesPerfisComponent } from './associar-permissoes-perfis.component';

describe('AssociarPermissoesPerfisComponent', () => {
  let component: AssociarPermissoesPerfisComponent;
  let fixture: ComponentFixture<AssociarPermissoesPerfisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociarPermissoesPerfisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociarPermissoesPerfisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
