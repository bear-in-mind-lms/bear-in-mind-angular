import { CourseLessonPartDto } from '../../../app/course/lesson/course-lesson-part-dto';

interface MockCourseLessonPart extends CourseLessonPartDto {}

export interface MockCourseLesson {
  readonly id: number;
  readonly courseId: number;
  readonly ordinal: number;
  readonly topic: string;
  readonly description?: string;
  readonly parts: MockCourseLessonPart[];
}
