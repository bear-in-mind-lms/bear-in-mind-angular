import { TestBed } from '@angular/core/testing';

import { DisabledEvaluationApiService } from './disabled-evaluation-api.service';

describe('DisabledEvaluationApiService', () => {
  let service: DisabledEvaluationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisabledEvaluationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
