import { TestBed } from '@angular/core/testing';

import { ApiPdfComprobanteService } from './api-pdf-comprobante.service';

describe('ApiPdfComprobanteService', () => {
  let service: ApiPdfComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPdfComprobanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
