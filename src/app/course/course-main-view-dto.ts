import { CourseListItemDto } from './course-list-item-dto';

export interface CourseMainViewDto {
  readonly conductedCourses: CourseListItemDto[];
  readonly activeCourses: CourseListItemDto[];
  readonly availableCourses: CourseListItemDto[];
  readonly completedCourses: CourseListItemDto[];
}
