import { TestBed } from '@angular/core/testing';

import { MttoUsuariosService } from './mtto-usuarios.service';

describe('MttoUsuariosService', () => {
  let service: MttoUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MttoUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
