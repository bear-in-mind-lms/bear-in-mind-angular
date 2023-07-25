import { ApiResponse } from '../../../app/api/api-response';
import { CourseLessonViewDto } from '../../../app/course/lesson/course-lesson-view-dto';
import { mockLessons } from './mock-course-lesson-data';

export function findCourseLessonViewDtoBy(
  id: number,
): ApiResponse<CourseLessonViewDto> {
  const lesson = mockLessons.get(id);
  if (lesson === undefined) {
    return ApiResponse.success();
  }

  return ApiResponse.success({
    topic: lesson.topic,
    description: lesson.description,
    parts: lesson.parts,
  });
}
