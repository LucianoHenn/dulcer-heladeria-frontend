import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDepositoComponent } from './registrar-deposito.component';

describe('RegistrarDepositoComponent', () => {
  let component: RegistrarDepositoComponent;
  let fixture: ComponentFixture<RegistrarDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarDepositoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
