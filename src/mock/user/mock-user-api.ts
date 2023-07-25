import { ApiResponse } from '../../app/api/api-response';
import { Page } from '../../app/api/page';
import { UserListItemDto } from '../../app/user/user-list-item-dto';
import { UserMainViewDto } from '../../app/user/user-main-view-dto';
import { UserViewDto } from '../../app/user/user-view-dto';
import {
  findUserCoursesWithOwnerOrTeacherRole,
  findUserCoursesWithStudentRole,
  hasUserActiveCourse,
  hasUserConductedCourse,
} from '../course/mock-course-repository';
import { toPageApiResponse } from '../mock-api-response';
import {
  findCommonUserGroups,
  findUserGroupsGroupedByRole,
  findUserGroupsOfUser,
} from './group/mock-user-group-repository';
import {
  findCommonUserCourses,
  findUserById,
  findUserPageInUserContainers,
} from './mock-user-repository';

export function findUserViewDtoBy(
  id: number,
  loggedInUserId: number,
): ApiResponse<UserViewDto> {
  const user = findUserById(id);
  if (user === undefined) {
    return ApiResponse.success();
  }

  const loggedInUser = findUserById(loggedInUserId)!;

  return ApiResponse.success({
    name: user.name,
    image: user.image,
    title: user.title,
    registrationDateTime: user.registrationDateTime,
    courses: findCommonUserCourses(loggedInUser, user),
    groups: findCommonUserGroups(loggedInUser, user),
  });
}

export function findUserMainViewDto(
  maxLength: number,
  loggedInUserId: number,
): ApiResponse<UserMainViewDto> {
  const user = findUserById(loggedInUserId)!;
  const groups = findUserGroupsGroupedByRole(user, maxLength);
  return ApiResponse.success({
    registeredGroups: groups.registered,
    availableGroups: groups.available,
    hasTeachers: hasUserActiveCourse(user),
    hasStudents: hasUserConductedCourse(user),
  });
}

export function findGroupMemberPage(
  page: number,
  pageSize: number,
  loggedInUserId: number,
): ApiResponse<Page<UserListItemDto>> {
  const user = findUserById(loggedInUserId)!;
  const users = findUserPageInUserContainers(
    page,
    pageSize,
    user,
    findUserGroupsOfUser(user),
    (group) => [...group.owners, ...group.members],
  );

  return toPageApiResponse([...users], page, pageSize);
}

export function findStudentPage(
  page: number,
  pageSize: number,
  loggedInUserId: number,
): ApiResponse<Page<UserListItemDto>> {
  const user = findUserById(loggedInUserId)!;
  const users = findUserPageInUserContainers(
    page,
    pageSize,
    user,
    findUserCoursesWithOwnerOrTeacherRole(user),
    (course) => course.students,
  );

  return toPageApiResponse([...users], page, pageSize);
}

export function findTeacherPage(
  page: number,
  pageSize: number,
  loggedInUserId: number,
): ApiResponse<Page<UserListItemDto>> {
  const user = findUserById(loggedInUserId)!;
  const users = findUserPageInUserContainers(
    page,
    pageSize,
    user,
    findUserCoursesWithStudentRole(user),
    (course) => [...course.owners, ...course.teachers],
  );

  return toPageApiResponse([...users], page, pageSize);
}
