import { TestBed } from '@angular/core/testing';

import { CreateUserServiceService } from './create-user-service.service';

describe('CreateUserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateUserServiceService = TestBed.get(CreateUserServiceService);
    expect(service).toBeTruthy();
  });
});
