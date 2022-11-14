import { TestBed } from '@angular/core/testing';

import { NuevaVentaService } from './nueva-venta.service';

describe('NuevaVentaService', () => {
  let service: NuevaVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevaVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
