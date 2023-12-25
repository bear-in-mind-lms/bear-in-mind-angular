import { TestBed } from '@angular/core/testing';

import { EnabledEvaluationApiService } from './enabled-evaluation-api.service';

describe('EnabledEvaluationApiService', () => {
  let service: EnabledEvaluationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnabledEvaluationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
