import { ApiResponse } from '../../../app/api/api-response';
import { Page } from '../../../app/api/page';
import { CreateOrUpdateUserGroupDto } from '../../../app/user/group/creator/create-or-update-user-group-dto';
import { UserGroupDto } from '../../../app/user/group/user-group-dto';
import { UserGroupListItemDto } from '../../../app/user/group/user-group-list-item-dto';
import { LocaleConfig } from '../../../locale/locale-config';
import { toPageApiResponse } from '../../mock-api-response';
import { findUserById } from '../mock-user-repository';
import { MockUserGroup } from './mock-user-group';
import { mockUserGroups } from './mock-user-group-data';
import {
  findAvailableUserGroupListItems,
  findRegisteredUserGroupListItems,
  findUserGroupById,
  findUserRoleInGroup,
} from './mock-user-group-repository';

export function createUserGroup(
  dto: CreateOrUpdateUserGroupDto,
  loggedInUserId: number,
): ApiResponse<number> {
  const userGroupIds = [...mockUserGroups.keys()];
  const userGroupId = userGroupIds[userGroupIds.length - 1] + 1;

  const name = dto.name[LocaleConfig.serverLocale];
  const user = findUserById(loggedInUserId)!;

  const userGroup: MockUserGroup = {
    id: userGroupId,
    name: name,
    image: undefined,
    owners: [user],
    members: [],
  };

  mockUserGroups.set(userGroupId, userGroup);
  return ApiResponse.success(userGroupId);
}

export function findUserGroupDtoBy(
  id: number,
  loggedInUserId: number,
): ApiResponse<UserGroupDto> {
  const group = findUserGroupById(id);
  if (group === undefined) {
    return ApiResponse.success();
  }

  const user = findUserById(loggedInUserId)!;

  return ApiResponse.success({
    name: group.name,
    image: group.image,
    members: [...group.owners, ...group.members],
    role: findUserRoleInGroup(group, user),
  });
}

export function findRegisteredUserGroupPage(
  page: number,
  pageSize: number,
  loggedInUserId: number,
): ApiResponse<Page<UserGroupListItemDto>> {
  const user = findUserById(loggedInUserId)!;
  const groups = findRegisteredUserGroupListItems(user);

  return toPageApiResponse(groups, page, pageSize);
}

export function findAvailableUserGroupPage(
  page: number,
  pageSize: number,
  loggedInUserId: number,
): ApiResponse<Page<UserGroupListItemDto>> {
  const user = findUserById(loggedInUserId)!;
  const groups = findAvailableUserGroupListItems(user);

  return toPageApiResponse(groups, page, pageSize);
}

export function join(
  groupId: number,
  loggedInUserId: number,
): ApiResponse<any> {
  const group = findUserGroupById(groupId)!;
  const user = findUserById(loggedInUserId)!;
  group.members.push(user);
  return ApiResponse.success();
}
