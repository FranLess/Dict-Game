import { TestBed } from '@angular/core/testing';

import { SanctumAuthServiceService } from './sanctum-auth-service.service';

describe('SanctumAuthServiceService', () => {
  let service: SanctumAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanctumAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
