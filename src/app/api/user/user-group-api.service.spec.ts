import { TestBed } from '@angular/core/testing';

import { UserGroupApiService } from './user-group-api.service';

describe('UserGroupApiService', () => {
  let service: UserGroupApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGroupApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
