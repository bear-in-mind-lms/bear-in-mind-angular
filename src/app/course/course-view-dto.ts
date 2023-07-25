import { UserListItemDto } from '../user/user-list-item-dto';
import { ActiveCourseDto } from './active/active-course-dto';
import { AvailableCourseDto } from './available/available-course-dto';
import { CompletedCourseDto } from './completed/completed-course-dto';
import { ConductedCourseDto } from './conducted/conducted-course-dto';
import { CourseLessonListItemDto } from './lesson/course-lesson-list-item-dto';

export interface CourseViewDto {
  readonly name: string;
  readonly description?: string;
  readonly image?: string;
  readonly teachers: UserListItemDto[];
  readonly lessons: CourseLessonListItemDto[];
  readonly endDateTime?: string;
  readonly conducted?: ConductedCourseDto;
  readonly active?: ActiveCourseDto;
  readonly available?: AvailableCourseDto;
  readonly completed?: CompletedCourseDto;
}
