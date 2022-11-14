import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarUbicacionesArticuloComponent } from './consultar-ubicaciones-articulo.component';

describe('ConsultarUbicacionesArticuloComponent', () => {
  let component: ConsultarUbicacionesArticuloComponent;
  let fixture: ComponentFixture<ConsultarUbicacionesArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarUbicacionesArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarUbicacionesArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
