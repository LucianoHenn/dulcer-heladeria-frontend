import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarArticuloComponent } from './registrar-articulo.component';

describe('RegistrarArticuloComponent', () => {
  let component: RegistrarArticuloComponent;
  let fixture: ComponentFixture<RegistrarArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarArticuloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
