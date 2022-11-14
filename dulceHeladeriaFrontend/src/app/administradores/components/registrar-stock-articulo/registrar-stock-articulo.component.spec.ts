import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarStockArticuloComponent } from './registrar-stock-articulo.component';

describe('RegistrarStockArticuloComponent', () => {
  let component: RegistrarStockArticuloComponent;
  let fixture: ComponentFixture<RegistrarStockArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarStockArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarStockArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
