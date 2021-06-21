import { TestBed } from '@angular/core/testing';

import { GivheadInterceptor } from './givhead.interceptor';

describe('GivheadInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GivheadInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: GivheadInterceptor = TestBed.inject(GivheadInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
