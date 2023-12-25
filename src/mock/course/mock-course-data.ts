import { mockUsers } from '../user/mock-user-data';
import { mockLessons } from './lesson/mock-course-lesson-data';
import { MockCourse } from './mock-course';

function findLessonsByCourseId(courseId: number) {
  return [...mockLessons.values()].filter(
    (lesson) => lesson.courseId === courseId,
  );
}

export const mockCourses = new Map<number, MockCourse>([
  [
    1,
    {
      id: 1,
      name: 'Administration',
      endDateTime: new Date(2021, 0, 1, 9).toISOString(),
      owners: [mockUsers.get(1)!],
      teachers: [],
      students: [],
      lessons: findLessonsByCourseId(1),
    },
  ],
  [
    2,
    {
      id: 2,
      name: 'Java',
      description: 'Discover the finest Indonesian coffee',
      image:
        'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      owners: [mockUsers.get(2)!],
      teachers: [mockUsers.get(1)!],
      students: [mockUsers.get(6)!, mockUsers.get(8)!, mockUsers.get(10)!],
      lessons: findLessonsByCourseId(2),
    },
  ],
  [
    3,
    {
      id: 3,
      name: 'Kotlin',
      owners: [mockUsers.get(2)!],
      teachers: [mockUsers.get(1)!],
      students: [mockUsers.get(7)!, mockUsers.get(8)!, mockUsers.get(10)!],
      lessons: findLessonsByCourseId(3),
    },
  ],
  [
    4,
    {
      id: 4,
      name: 'Spring Framework',
      description: 'Let your server bloom',
      image:
        'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      owners: [mockUsers.get(2)!],
      teachers: [mockUsers.get(1)!],
      students: [mockUsers.get(8)!, mockUsers.get(9)!, mockUsers.get(10)!],
      lessons: findLessonsByCourseId(4),
    },
  ],
  [
    5,
    {
      id: 5,
      name: 'TypeScript',
      description: 'Meet the sane brother of JavaScript',
      registrationClosingDateTime: new Date(
        Date.now() + 1000 * 60 * 60 * 4,
      ).toISOString(),
      owners: [mockUsers.get(3)!],
      teachers: [],
      students: [mockUsers.get(11)!, mockUsers.get(13)!],
      lessons: findLessonsByCourseId(5),
    },
  ],
  [
    6,
    {
      id: 6,
      name: 'React',
      description: 'React aka React.js aka ReactJS from Meta aka Facebook',
      image:
        'https://images.unsplash.com/photo-1678008631040-d1989e5a0d69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1154&q=80',
      owners: [mockUsers.get(3)!],
      teachers: [],
      students: [mockUsers.get(12)!, mockUsers.get(13)!],
      lessons: findLessonsByCourseId(6),
    },
  ],
  [
    7,
    {
      id: 7,
      name: 'PostgreSQL',
      image:
        'https://images.unsplash.com/photo-1605326152964-56fb991b95ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80',
      endDateTime: new Date(2021, 0, 2, 12).toISOString(),
      owners: [mockUsers.get(2)!],
      teachers: [mockUsers.get(3)!, mockUsers.get(4)!],
      students: [mockUsers.get(14)!],
      lessons: findLessonsByCourseId(7),
    },
  ],
  [
    8,
    {
      id: 8,
      name: 'Docker',
      description: "Put the container on the whale's back",
      image:
        'https://images.unsplash.com/photo-1583748402295-d8fa0876f172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      endDateTime: new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 2013,
      ).toISOString(),
      owners: [mockUsers.get(4)!],
      teachers: [],
      students: [mockUsers.get(1)!, mockUsers.get(15)!, mockUsers.get(17)!],
      lessons: findLessonsByCourseId(8),
    },
  ],
  [
    9,
    {
      id: 9,
      name: 'Kubernetes',
      description: '/ˌk(j)uːbərˈnɛtɪs, -ˈneɪtɪs, -ˈneɪtiːz, -ˈnɛtiːz/',
      image:
        'https://images.unsplash.com/photo-1463567517034-628c51048aa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      endDateTime: new Date(2021, 0, 4, 10).toISOString(),
      owners: [mockUsers.get(4)!],
      teachers: [],
      students: [mockUsers.get(1)!, mockUsers.get(16)!, mockUsers.get(17)!],
      lessons: findLessonsByCourseId(9),
    },
  ],
  [
    10,
    {
      id: 10,
      name: 'Gamification in Education',
      description: 'Press any key to teach',
      image:
        'https://images.unsplash.com/flagged/photo-1580234820596-0876d136e6d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1167&q=80',
      owners: [mockUsers.get(5)!],
      teachers: [],
      students: [
        mockUsers.get(1)!,
        mockUsers.get(2)!,
        mockUsers.get(3)!,
        mockUsers.get(4)!,
      ],
      lessons: findLessonsByCourseId(10),
    },
  ],
  [
    11,
    {
      id: 11,
      name: 'English',
      image:
        'https://images.unsplash.com/photo-1581024013650-28295fd60327?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      endDateTime: new Date(
        Date.now() + 1000 * 60 * 60 * 24 * 365,
      ).toISOString(),
      owners: [mockUsers.get(5)!],
      teachers: [],
      students: [],
      lessons: findLessonsByCourseId(11),
    },
  ],
]);
