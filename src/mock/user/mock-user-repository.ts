import { UserCourseDto } from '../../app/user/user-course-dto';
import { UserListItemDto } from '../../app/user/user-list-item-dto';
import { mockCourses } from '../course/mock-course-data';
import { MockUser } from './mock-user';
import { mockUsers } from './mock-user-data';

export function findUserById(id: number) {
  return mockUsers.get(id);
}

export function findUserByUsername(username: string) {
  return [...mockUsers.values()].find((user) => user.username === username);
}

export function findCommonUserCourses(
  firstUser: MockUser,
  secondUser: MockUser,
): UserCourseDto[] {
  return [...mockCourses.values()]
    .filter((course) => {
      const courseUsers = [
        ...course.owners,
        ...course.teachers,
        ...course.students,
      ];

      return (
        courseUsers.includes(firstUser) && courseUsers.includes(secondUser)
      );
    })
    .map((course) => ({
      id: course.id,
      name: course.name,
      image: course.image,
      roles: ['TEACHER', 'STUDENT'],
    }));
}

export function findUserPageInUserContainers<ContainerType>(
  page: number,
  pageSize: number,
  loggedInUser: MockUser,
  containers: ContainerType[],
  extractUsersFromContainer: (container: ContainerType) => MockUser[],
): Set<UserListItemDto> {
  const users = new Set<MockUser>();
  for (const container of containers) {
    for (const user of extractUsersFromContainer(container)) {
      if (user !== loggedInUser) {
        users.add(user);
      }
    }
  }

  return users;
}
