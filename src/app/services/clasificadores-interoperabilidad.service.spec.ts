import { TestBed } from '@angular/core/testing';

import { ClasificadoresInteroperabilidadService } from './clasificadores-interoperabilidad.service';

describe('ClasificadoresInteroperabilidadService', () => {
  let service: ClasificadoresInteroperabilidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasificadoresInteroperabilidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
