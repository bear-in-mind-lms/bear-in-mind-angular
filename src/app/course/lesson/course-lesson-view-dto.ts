import { CourseLessonPartDto } from './course-lesson-part-dto';

export interface CourseLessonViewDto {
  readonly topic: string;
  readonly description?: string;
  readonly image?: string;
  readonly parts: CourseLessonPartDto[];
}
