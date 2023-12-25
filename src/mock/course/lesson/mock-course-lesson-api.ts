import { ApiResponse } from '../../../app/api/api-response';
import { CourseLessonViewDto } from '../../../app/course/lesson/course-lesson-view-dto';
import { findCourseLessonById } from './mock-course-lesson-repository';

export function findCourseLessonViewDtoBy(
  id: number,
): ApiResponse<CourseLessonViewDto> {
  const lesson = findCourseLessonById(id);
  if (lesson === undefined) {
    return ApiResponse.success();
  }

  return ApiResponse.success({
    topic: lesson.topic,
    description: lesson.description,
    parts: lesson.parts,
  });
}
