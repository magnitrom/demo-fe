import { TestBed } from '@angular/core/testing';

import { SpMenuService } from './sp-menu.service';

describe('SpMenuService', () => {
  let service: SpMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
