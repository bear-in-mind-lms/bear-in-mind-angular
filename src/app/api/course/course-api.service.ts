import { Injectable } from '@angular/core';
import { CourseListItemDto } from '../../course/course-list-item-dto';
import { CourseMainViewDto } from '../../course/course-main-view-dto';
import { CourseViewDto } from '../../course/course-view-dto';
import { CreateCourseDto } from '../../course/creator/create-course-dto';
import { ApiService } from '../api-service';
import { Page } from '../page';
import { Pagination } from '../pagination';

function path(path: string) {
  return `/course${path}`;
}

@Injectable({
  providedIn: 'root',
})
export class CourseApiService {
  constructor(private readonly api: ApiService) {}

  createCourse(dto: CreateCourseDto) {
    return this.api.post<number>(
      {
        path: path(''),
      },
      dto,
    );
  }

  findCourseMainViewDto(listLength: number) {
    return this.api.get<CourseMainViewDto>({
      path: path('/main-view'),
      params: { listLength: listLength },
    });
  }

  findConductedCoursePage(pagination: Pagination) {
    return this.api.get<Page<CourseListItemDto>>({
      path: path('/list/conducted'),
      params: pagination,
    });
  }

  findActiveCoursePage(pagination: Pagination) {
    return this.api.get<Page<CourseListItemDto>>({
      path: path('/list/active'),
      params: pagination,
    });
  }

  findAvailableCoursePage(pagination: Pagination) {
    return this.api.get<Page<CourseListItemDto>>({
      path: path('/list/available'),
      params: pagination,
    });
  }

  findCompletedCoursePage(pagination: Pagination) {
    return this.api.get<Page<CourseListItemDto>>({
      path: path('/list/completed'),
      params: pagination,
    });
  }

  findCourseViewDtoBy(id: number) {
    return this.api.get<CourseViewDto>({
      path: path('/:id'),
      pathVariables: { id: id },
    });
  }

  enrollUserInCourse(courseId: number) {
    return this.api.post({
      path: path('/enroll/:courseId'),
      pathVariables: { courseId: courseId },
    });
  }
}
