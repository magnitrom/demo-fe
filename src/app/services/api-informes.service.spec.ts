import { TestBed } from '@angular/core/testing';

import { ApiInformesService } from './api-informes.service';

describe('ApiInformesService', () => {
  let service: ApiInformesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiInformesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
