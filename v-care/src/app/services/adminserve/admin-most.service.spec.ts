import { TestBed } from '@angular/core/testing';

import { AdminMostService } from './admin-most.service';

describe('AdminMostService', () => {
  let service: AdminMostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
