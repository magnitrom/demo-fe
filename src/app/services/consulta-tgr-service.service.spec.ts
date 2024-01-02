import { TestBed } from '@angular/core/testing';

import { ConsultaTgrServiceService } from './consulta-tgr-service.service';

describe('ConsultaTgrServiceService', () => {
  let service: ConsultaTgrServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaTgrServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
