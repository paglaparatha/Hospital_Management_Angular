import { TestBed } from '@angular/core/testing';

import { ConnectApisService } from './connect-apis.service';

describe('ConnectApisService', () => {
  let service: ConnectApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
