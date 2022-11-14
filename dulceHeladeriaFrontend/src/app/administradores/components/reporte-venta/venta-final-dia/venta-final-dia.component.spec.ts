import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaFinalDiaComponent } from './venta-final-dia.component';

describe('VentaFinalDiaComponent', () => {
  let component: VentaFinalDiaComponent;
  let fixture: ComponentFixture<VentaFinalDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaFinalDiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaFinalDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
