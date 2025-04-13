import { TestBed } from '@angular/core/testing';

import { RoleGaurdService } from './role-gaurd.service';

describe('RoleGaurdService', () => {
  let service: RoleGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
