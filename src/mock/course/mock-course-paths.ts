import { ApiResponse } from '../../app/api/api-response';
import { MockRequestArguments } from '../mock-request-arguments';
import {
  createCourse,
  enrollUserInCourse,
  findActiveCoursePage,
  findAvailableCoursePage,
  findCompletedCoursePage,
  findConductedCoursePage,
  findCourseMainViewDto,
  findCourseViewDtoBy,
} from './mock-course-api';

export const COURSE_PATH_REQUEST_MAP = new Map<
  string,
  (args: MockRequestArguments) => ApiResponse<any>
>([
  [
    'POST /course',
    (args) => createCourse(args.body, args.deps.loggedInUser.userId),
  ],
  [
    'GET /course/main-view',
    (args) =>
      findCourseMainViewDto(
        args.params!['listLength'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'GET /course/list/conducted',
    (args) =>
      findConductedCoursePage(
        args.params!['pageNumber'] as number,
        args.params!['pageSize'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'GET /course/list/active',
    (args) =>
      findActiveCoursePage(
        args.params!['pageNumber'] as number,
        args.params!['pageSize'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'GET /course/list/available',
    (args) =>
      findAvailableCoursePage(
        args.params!['pageNumber'] as number,
        args.params!['pageSize'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'GET /course/list/completed',
    (args) =>
      findCompletedCoursePage(
        args.params!['pageNumber'] as number,
        args.params!['pageSize'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'GET /course/:id',
    (args) =>
      findCourseViewDtoBy(
        args.pathVariables!['id'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'POST /course/enroll/:courseId',
    (args) =>
      enrollUserInCourse(
        args.pathVariables!['courseId'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
]);
