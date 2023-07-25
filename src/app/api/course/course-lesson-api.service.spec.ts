import { TestBed } from '@angular/core/testing';

import { CourseLessonApiService } from './course-lesson-api.service';

describe('CourseLessonApiService', () => {
  let service: CourseLessonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseLessonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
