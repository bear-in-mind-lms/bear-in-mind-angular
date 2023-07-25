import { ApiResponse } from '../../../app/api/api-response';
import { MockRequestArguments } from '../../mock-request-arguments';
import {
  createUserGroup,
  findAvailableUserGroupPage,
  findRegisteredUserGroupPage,
  findUserGroupDtoBy,
  join,
} from './mock-user-group-api';

export const USER_GROUP_PATH_REQUEST_MAP = new Map<
  string,
  (args: MockRequestArguments) => ApiResponse<any>
>([
  [
    'POST /user/group',
    (args) => createUserGroup(args.body, args.deps.loggedInUser.userId),
  ],
  [
    'GET /user/group/:id',
    (args) =>
      findUserGroupDtoBy(
        args.pathVariables!['id'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'GET /user/group/list/registered',
    (args) =>
      findRegisteredUserGroupPage(
        args.params!['pageNumber'] as number,
        args.params!['pageSize'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'GET /user/group/list/available',
    (args) =>
      findAvailableUserGroupPage(
        args.params!['pageNumber'] as number,
        args.params!['pageSize'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'POST /user/group/join/:groupId',
    (args) =>
      join(
        args.pathVariables!['groupId'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
]);
