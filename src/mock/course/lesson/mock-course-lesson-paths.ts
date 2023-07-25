import { ApiResponse } from '../../../app/api/api-response';
import { MockRequestArguments } from '../../mock-request-arguments';
import { findCourseLessonViewDtoBy } from './mock-course-lesson-api';

export const COURSE_LESSON_PATH_REQUEST_MAP = new Map<
  string,
  (args: MockRequestArguments) => ApiResponse<any>
>([
  [
    'GET /course/lesson/:id',
    (args) => findCourseLessonViewDtoBy(args.pathVariables!['id'] as number),
  ],
]);
