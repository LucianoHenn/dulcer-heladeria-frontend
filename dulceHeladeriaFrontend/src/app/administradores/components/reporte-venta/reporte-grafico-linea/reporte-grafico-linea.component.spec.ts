import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteGraficoLineaComponent } from './reporte-grafico-linea.component';

describe('ReporteGraficoLineaComponent', () => {
  let component: ReporteGraficoLineaComponent;
  let fixture: ComponentFixture<ReporteGraficoLineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteGraficoLineaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteGraficoLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
