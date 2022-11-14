import { TestBed } from '@angular/core/testing';

import { UbicacionDepositoService } from './ubicacion-deposito.service';

describe('UbicacionDepositoService', () => {
  let service: UbicacionDepositoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UbicacionDepositoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
