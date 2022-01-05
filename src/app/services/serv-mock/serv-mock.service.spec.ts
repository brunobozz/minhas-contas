import { TestBed } from '@angular/core/testing';

import { ServMockService } from './serv-mock.service';

describe('ServMockService', () => {
  let service: ServMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
