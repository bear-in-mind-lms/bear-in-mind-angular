import { UserGroupListItemDto } from '../../../app/user/group/user-group-list-item-dto';
import { UserGroupRole } from '../../../app/user/group/user-group-role';
import { MockUser } from '../mock-user';
import { MockUserGroup } from './mock-user-group';
import { mockUserGroups } from './mock-user-group-data';

export function findUserGroupById(id: number) {
  return mockUserGroups.get(id);
}

export function findUserGroupsGroupedByRole(user: MockUser, maxLength: number) {
  const registered: UserGroupListItemDto[] = [];
  const available: UserGroupListItemDto[] = [];

  for (const group of [...mockUserGroups.values()]) {
    switch (findUserRoleInGroup(group, user)) {
      case UserGroupRole.owner:
      case UserGroupRole.member: {
        if (registered.length < maxLength) {
          registered.push(mapMockUserGroupToUserGroupListItemDto(group));
        }
        break;
      }
      case undefined: {
        if (available.length < maxLength) {
          available.push(mapMockUserGroupToUserGroupListItemDto(group));
        }
        break;
      }
    }
  }

  return { registered, available };
}

function mapMockUserGroupToUserGroupListItemDto(
  course: MockUserGroup,
): UserGroupListItemDto {
  return { id: course.id, name: course.name, image: course.image };
}

export function findRegisteredUserGroupListItems(
  user: MockUser,
  maxLength: number | undefined = undefined,
): UserGroupListItemDto[] {
  return findUserGroupListItems(
    user,
    [UserGroupRole.owner, UserGroupRole.member],
    maxLength,
  );
}

export function findAvailableUserGroupListItems(
  user: MockUser,
  maxLength: number | undefined = undefined,
): UserGroupListItemDto[] {
  return findUserGroupListItems(user, [undefined], maxLength);
}

function findUserGroupListItems(
  user: MockUser,
  roles: (string | undefined)[],
  maxLength: number | undefined = undefined,
): UserGroupListItemDto[] {
  let groups = [...mockUserGroups.values()].filter((group) =>
    roles.includes(findUserRoleInGroup(group, user)),
  );

  if (maxLength !== undefined) {
    groups = groups.slice(0, maxLength);
  }

  return groups.map((group) => {
    return { id: group.id, name: group.name, image: group.image };
  });
}

export function findUserGroupsOfUser(user: MockUser): MockUserGroup[] {
  return [...mockUserGroups.values()].filter((group) =>
    [...group.owners, ...group.members].includes(user),
  );
}

export function findCommonUserGroups(
  firstUser: MockUser,
  secondUser: MockUser,
): MockUserGroup[] {
  return [...mockUserGroups.values()].filter((group) => {
    const members = [...group.owners, ...group.members];
    return members.includes(firstUser) && members.includes(secondUser);
  });
}

export function findUserRoleInGroup(
  group: MockUserGroup,
  user: MockUser,
): string | undefined {
  if (isUserOwnerOfGroup(user, group)) {
    return UserGroupRole.owner;
  } else if (isUserMemberOfGroup(user, group)) {
    return UserGroupRole.member;
  } else {
    return undefined;
  }
}

function isUserOwnerOfGroup(user: MockUser, group: MockUserGroup) {
  return group.owners.includes(user);
}

function isUserMemberOfGroup(user: MockUser, group: MockUserGroup) {
  return group.members.includes(user);
}
