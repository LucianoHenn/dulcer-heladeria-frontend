import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarDepositoComponent } from './consultar-deposito.component';

describe('ConsultarDepositoComponent', () => {
  let component: ConsultarDepositoComponent;
  let fixture: ComponentFixture<ConsultarDepositoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarDepositoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
