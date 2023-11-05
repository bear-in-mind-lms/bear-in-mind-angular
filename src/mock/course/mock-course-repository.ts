import { CourseListItemDto } from '../../app/course/course-list-item-dto';
import { MockUser } from '../user/mock-user';
import { isCourseCompleted, MockCourse, MockCourseStatus } from './mock-course';
import { mockCourses } from './mock-course-data';

export function findCourseById(id: number) {
  return mockCourses.get(id);
}

export function findCoursesGroupedByStatus(user: MockUser, maxLength: number) {
  const conducted: CourseListItemDto[] = [];
  const active: CourseListItemDto[] = [];
  const available: CourseListItemDto[] = [];
  const completed: CourseListItemDto[] = [];

  for (const course of [...mockCourses.values()]) {
    switch (findCourseStatusOfUser(course, user)) {
      case MockCourseStatus.CONDUCTED: {
        if (conducted.length < maxLength) {
          conducted.push(mapMockCourseToCourseListItemDto(course));
        }
        break;
      }
      case MockCourseStatus.ACTIVE: {
        if (active.length < maxLength) {
          active.push(mapMockCourseToCourseListItemDto(course));
        }
        break;
      }
      case MockCourseStatus.AVAILABLE: {
        if (available.length < maxLength) {
          available.push(mapMockCourseToCourseListItemDto(course));
        }
        break;
      }
      case MockCourseStatus.COMPLETED: {
        if (completed.length < maxLength) {
          completed.push(mapMockCourseToCourseListItemDto(course));
        }
        break;
      }
    }
  }

  return { conducted, active, available, completed };
}

function mapMockCourseToCourseListItemDto(
  course: MockCourse,
): CourseListItemDto {
  return { id: course.id, name: course.name, image: course.image };
}

export function findCourseStatusOfUser(
  course: MockCourse,
  user: MockUser,
): MockCourseStatus | undefined {
  if (isCourseCompleted(course)) {
    return isUserEnrolledInCourse(user, course)
      ? MockCourseStatus.COMPLETED
      : undefined;
  }

  if (isUserTeacherInCourse(user, course)) {
    return MockCourseStatus.CONDUCTED;
  } else if (isUserStudentInCourse(user, course)) {
    return MockCourseStatus.ACTIVE;
  } else {
    return MockCourseStatus.AVAILABLE;
  }
}

export function isUserEnrolledInCourse(user: MockUser, course: MockCourse) {
  return [...course.owners, ...course.teachers, ...course.students].includes(
    user,
  );
}

export function isUserTeacherInCourse(user: MockUser, course: MockCourse) {
  return [...course.owners, ...course.teachers].includes(user);
}

export function isUserStudentInCourse(user: MockUser, course: MockCourse) {
  return course.students.includes(user);
}

export function findUserCoursesWithStudentRole(user: MockUser): MockCourse[] {
  return [...mockCourses.values()].filter((course) =>
    course.students.includes(user),
  );
}

export function findUserCoursesWithOwnerOrTeacherRole(
  user: MockUser,
): MockCourse[] {
  return [...mockCourses.values()].filter((course) =>
    [...course.owners, ...course.teachers].includes(user),
  );
}

export function hasUserActiveCourse(user: MockUser) {
  return [...mockCourses.values()].some((course) =>
    course.students.includes(user),
  );
}

export function hasUserConductedCourse(user: MockUser) {
  return [...mockCourses.values()].some((course) =>
    [...course.owners, ...course.teachers].includes(user),
  );
}
