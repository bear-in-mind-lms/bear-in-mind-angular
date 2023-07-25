import { ApiResponse } from '../../app/api/api-response';
import { Page } from '../../app/api/page';
import { ActiveCourseDto } from '../../app/course/active/active-course-dto';
import { AvailableCourseDto } from '../../app/course/available/available-course-dto';
import { CompletedCourseDto } from '../../app/course/completed/completed-course-dto';
import { ConductedCourseDto } from '../../app/course/conducted/conducted-course-dto';
import { CourseListItemDto } from '../../app/course/course-list-item-dto';
import { CourseMainViewDto } from '../../app/course/course-main-view-dto';
import { CourseViewDto } from '../../app/course/course-view-dto';
import { CreateCourseDto } from '../../app/course/creator/create-course-dto';
import { LocaleConfig } from '../../locale/locale-config';
import { toPageApiResponse } from '../mock-api-response';
import { findUserById } from '../user/mock-user-repository';
import { MockCourse, MockCourseStatus } from './mock-course';
import { isCourseCompleted, mockCourses } from './mock-course-data';
import {
  findCoursesGroupedByStatus,
  findCourseStatusOfUser,
  isUserEnrolledInCourse,
  isUserStudentInCourse,
  isUserTeacherInCourse,
} from './mock-course-repository';

export function createCourse(
  dto: CreateCourseDto,
  loggedInUserId: number,
): ApiResponse<number> {
  const courseIds = [...mockCourses.keys()];
  const courseId = courseIds[courseIds.length - 1] + 1;

  const serverLocaleCourseTranslations =
    dto.translations[LocaleConfig.serverLocale];

  const user = findUserById(loggedInUserId)!;

  const course: MockCourse = {
    id: courseId,
    name: serverLocaleCourseTranslations['name'],
    description: serverLocaleCourseTranslations['description'],
    image: undefined,
    endDateTime: dto.endDateTime,
    registrationClosingDateTime: dto.registrationClosingDateTime,
    owners: [user],
    teachers: [],
    students: [],
    lessons: [],
  };

  mockCourses.set(courseId, course);
  return ApiResponse.success(courseId);
}

export function findCourseMainViewDto(
  loggedInUserId: number,
  maxLength: number,
): ApiResponse<CourseMainViewDto> {
  const user = findUserById(loggedInUserId)!;
  const courses = findCoursesGroupedByStatus(user, maxLength);

  return ApiResponse.success({
    conductedCourses: courses.conducted,
    activeCourses: courses.active,
    availableCourses: courses.available,
    completedCourses: courses.completed,
  });
}

export function findConductedCoursePage(
  page: number,
  pageSize: number,
  loggedInUserId: number,
): ApiResponse<Page<CourseListItemDto>> {
  const user = findUserById(loggedInUserId)!;
  const courses = [...mockCourses.values()].filter(
    (course) =>
      !isCourseCompleted(course) && isUserTeacherInCourse(user, course),
  );

  return toPageApiResponse(courses, page, pageSize);
}

export function findActiveCoursePage(
  page: number,
  pageSize: number,
  loggedInUserId: number,
): ApiResponse<Page<CourseListItemDto>> {
  const user = findUserById(loggedInUserId)!;
  const courses = [...mockCourses.values()].filter(
    (course) =>
      !isCourseCompleted(course) && isUserStudentInCourse(user, course),
  );

  return toPageApiResponse(courses, page, pageSize);
}

export function findAvailableCoursePage(
  page: number,
  pageSize: number,
  loggedInUserId: number,
) {
  const user = findUserById(loggedInUserId)!;
  const courses = [...mockCourses.values()].filter(
    (course) =>
      !isCourseCompleted(course) && !isUserEnrolledInCourse(user, course),
  );

  return toPageApiResponse(courses, page, pageSize);
}

export function findCompletedCoursePage(
  page: number,
  pageSize: number,
  loggedInUserId: number,
) {
  const user = findUserById(loggedInUserId)!;
  const courses = [...mockCourses.values()].filter(
    (course) =>
      isCourseCompleted(course) && isUserEnrolledInCourse(user, course),
  );

  return toPageApiResponse(courses, page, pageSize);
}

export function findCourseViewDtoBy(
  id: number,
  loggedInUserId: number,
): ApiResponse<CourseViewDto> {
  const course = mockCourses.get(id);
  if (course === undefined) {
    return ApiResponse.success<CourseViewDto>();
  }

  const user = findUserById(loggedInUserId)!;

  let conducted: ConductedCourseDto | undefined;
  let active: ActiveCourseDto | undefined;
  let available: AvailableCourseDto | undefined;
  let completed: CompletedCourseDto | undefined;

  switch (findCourseStatusOfUser(course, user)) {
    case MockCourseStatus.CONDUCTED: {
      conducted = {};
      break;
    }
    case MockCourseStatus.ACTIVE: {
      active = {};
      break;
    }
    case MockCourseStatus.AVAILABLE: {
      available = {
        registrationClosingDateTime: course.registrationClosingDateTime,
      };
      break;
    }
    case MockCourseStatus.COMPLETED: {
      completed = {};
      break;
    }
  }

  return ApiResponse.success({
    name: course.name,
    description: course.description,
    image: course.image,
    teachers: [...course.owners, ...course.teachers],
    lessons: course.lessons,
    endDateTime: course.endDateTime,
    conducted: conducted,
    active: active,
    available: available,
    completed: completed,
  });
}

export function enrollUserInCourse(
  courseId: number,
  loggedInUserId: number,
): ApiResponse<any> {
  const course = mockCourses.get(courseId)!;
  const user = findUserById(loggedInUserId)!;
  course.students.push(user);
  return ApiResponse.success();
}
