import { TestBed } from '@angular/core/testing';

import { DummyServiceService } from './dummy-service.service';

describe('DummyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DummyServiceService = TestBed.get(DummyServiceService);
    expect(service).toBeTruthy();
  });
});
