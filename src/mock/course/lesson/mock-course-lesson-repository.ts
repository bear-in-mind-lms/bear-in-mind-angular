import { mockLessons } from './mock-course-lesson-data';

export function findCourseLessonById(id: number) {
  return mockLessons.get(id);
}
