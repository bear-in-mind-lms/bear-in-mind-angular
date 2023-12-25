import { MockUser } from '../user/mock-user';
import { MockCourseLesson } from './lesson/mock-course-lesson';

export interface MockCourse {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly image?: string;
  readonly endDateTime?: string;
  readonly registrationClosingDateTime?: string;
  readonly owners: MockUser[];
  readonly teachers: MockUser[];
  readonly students: MockUser[];
  readonly lessons: MockCourseLesson[];
}

export const enum MockCourseStatus {
  CONDUCTED,
  ACTIVE,
  AVAILABLE,
  COMPLETED,
}

export function isCourseCompleted(course: MockCourse) {
  return course.endDateTime === undefined
    ? false
    : Date.parse(course.endDateTime) <= Date.now();
}
