import { TestBed } from '@angular/core/testing';

import { AuthGaurdservService } from './auth-gaurdserv.service';

describe('AuthGaurdservService', () => {
  let service: AuthGaurdservService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGaurdservService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
