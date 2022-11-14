import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarUbicacionDepositoComponent } from './registrar-ubicacion-deposito.component';

describe('RegistrarUbicacionDepositoComponent', () => {
  let component: RegistrarUbicacionDepositoComponent;
  let fixture: ComponentFixture<RegistrarUbicacionDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarUbicacionDepositoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarUbicacionDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
