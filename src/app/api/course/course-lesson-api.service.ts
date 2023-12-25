import { Injectable } from '@angular/core';
import { CourseLessonViewDto } from '../../course/lesson/course-lesson-view-dto';
import { ApiService } from '../api-service';

function path(path: string) {
  return `/course${path}`;
}

@Injectable({
  providedIn: 'root',
})
export class CourseLessonApiService {
  constructor(private readonly api: ApiService) {}

  findCourseLessonViewDtoBy(id: number) {
    return this.api.get<CourseLessonViewDto>({
      path: path('/lesson/:id'),
      pathVariables: { id },
    });
  }
}
