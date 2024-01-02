import { TestBed } from '@angular/core/testing';

import { MttoRolesService } from './mtto-roles.service';

describe('MttoRolesService', () => {
  let service: MttoRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MttoRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
