import { TestBed } from '@angular/core/testing';

import { BeverageService } from './beverage.service';

describe('BeverageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeverageService = TestBed.get(BeverageService);
    expect(service).toBeTruthy();
  });
});
