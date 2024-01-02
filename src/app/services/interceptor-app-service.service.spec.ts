import { TestBed } from '@angular/core/testing';

import { InterceptorAppServiceService } from './interceptor-app-service.service';

describe('InterceptorAppServiceService', () => {
  let service: InterceptorAppServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorAppServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
