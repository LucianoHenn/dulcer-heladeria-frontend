import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarUbicacionDepositoComponent } from './consultar-ubicacion-deposito.component';

describe('ConsultarUbicacionDepositoComponent', () => {
  let component: ConsultarUbicacionDepositoComponent;
  let fixture: ComponentFixture<ConsultarUbicacionDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarUbicacionDepositoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarUbicacionDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
