import { TestBed } from '@angular/core/testing';

import { LoginServeService } from './login-serve.service';

describe('LoginServeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginServeService = TestBed.get(LoginServeService);
    expect(service).toBeTruthy();
  });
});
