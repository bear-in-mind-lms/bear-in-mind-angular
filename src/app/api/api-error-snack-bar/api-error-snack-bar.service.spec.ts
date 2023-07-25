import { TestBed } from '@angular/core/testing';

import { ApiErrorSnackBar } from './api-error-snack-bar.service';

describe('ApiErrorSnackBar', () => {
  let service: ApiErrorSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiErrorSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
