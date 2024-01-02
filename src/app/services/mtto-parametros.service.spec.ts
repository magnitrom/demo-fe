import { TestBed } from '@angular/core/testing';

import { MttoParametrosService } from './mtto-parametros.service';

describe('MttoParametrosService', () => {
  let service: MttoParametrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MttoParametrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
