import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeIdentityComponent } from './type-identity.component';

describe('TypeIdentityComponent', () => {
  let component: TypeIdentityComponent;
  let fixture: ComponentFixture<TypeIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeIdentityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
