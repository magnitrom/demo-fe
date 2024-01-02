import { TestBed } from '@angular/core/testing';

import { SeguridadApiService } from './seguridad-api.service';

describe('SeguridadApiService', () => {
  let service: SeguridadApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguridadApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
