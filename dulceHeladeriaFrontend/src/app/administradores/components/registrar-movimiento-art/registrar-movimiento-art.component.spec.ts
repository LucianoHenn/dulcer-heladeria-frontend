import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMovimientoArtComponent } from './registrar-movimiento-art.component';

describe('RegistrarMovimientoArtComponent', () => {
  let component: RegistrarMovimientoArtComponent;
  let fixture: ComponentFixture<RegistrarMovimientoArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarMovimientoArtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarMovimientoArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
