import { ApiResponse } from '../../app/api/api-response';
import { MockRequestArguments } from '../mock-request-arguments';
import {
  findGroupMemberPage,
  findStudentPage,
  findTeacherPage,
  findUserMainViewDto,
  findUserViewDtoBy,
} from './mock-user-api';

export const USER_PATH_REQUEST_MAP = new Map<
  string,
  (args: MockRequestArguments) => ApiResponse<any>
>([
  [
    'GET /user/:id',
    (args) =>
      findUserViewDtoBy(
        args.pathVariables!['id'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'GET /user/main-view',
    (args) =>
      findUserMainViewDto(
        args.params!['listLength'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'GET /user/list/group-members',
    (args) =>
      findGroupMemberPage(
        args.params!['pageNumber'] as number,
        args.params!['pageSize'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'GET /user/list/students',
    (args) =>
      findStudentPage(
        args.params!['pageNumber'] as number,
        args.params!['pageSize'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'GET /user/list/teachers',
    (args) =>
      findTeacherPage(
        args.params!['pageNumber'] as number,
        args.params!['pageSize'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
]);
