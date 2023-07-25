import { UserRole } from '../../app/auth/user-role';
import { MockUser } from './mock-user';

const ADMINISTRATOR_ROLE_GROUP = [
  UserRole.administrator,
  UserRole.teacher,
  UserRole.student,
];
const TEACHER_ROLE_GROUP = [UserRole.teacher, UserRole.student];
const STUDENT_ROLE_GROUP = [UserRole.student];

export const mockUsers = new Map<number, MockUser>([
  [
    1,
    {
      id: 1,
      username: 'mrmasterkey',
      name: 'Keith Master',
      title: 'Mr',
      registrationDateTime: new Date(2020, 0, 1, 8).toISOString(),
      roles: ADMINISTRATOR_ROLE_GROUP,
    },
  ],
  [
    2,
    {
      id: 2,
      username: 'teacherbackend',
      name: 'James Gosling',
      title: 'PhD',
      registrationDateTime: new Date(2020, 0, 2, 8).toISOString(),
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/James_Gosling_2008.jpg/1024px-James_Gosling_2008.jpg',
      roles: TEACHER_ROLE_GROUP,
    },
  ],
  [
    3,
    {
      id: 3,
      username: 'teacherfrontend',
      name: 'Brendan Eich',
      registrationDateTime: new Date(2020, 0, 3, 8).toISOString(),
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Brendan_Eich_Mozilla_Foundation_official_photo.jpg/1024px-Brendan_Eich_Mozilla_Foundation_official_photo.jpg',
      roles: TEACHER_ROLE_GROUP,
    },
  ],
  [
    4,
    {
      id: 4,
      username: 'teacherdevops',
      name: 'Brendan Burns',
      registrationDateTime: new Date(2020, 0, 4, 8).toISOString(),
      roles: TEACHER_ROLE_GROUP,
    },
  ],
  [
    5,
    {
      id: 5,
      username: 'teacherofteachers',
      name: 'Leonardo di ser Piero da Vinci',
      registrationDateTime: new Date(2020, 0, 5, 8).toISOString(),
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Francesco_Melzi_-_Portrait_of_Leonardo.png/800px-Francesco_Melzi_-_Portrait_of_Leonardo.png',
      roles: TEACHER_ROLE_GROUP,
    },
  ],
  [
    6,
    {
      id: 6,
      username: 'studentjava',
      name: 'Wendell Java',
      registrationDateTime: new Date(2020, 0, 6, 8).toISOString(),
      roles: STUDENT_ROLE_GROUP,
    },
  ],

  [
    7,
    {
      id: 7,
      username: 'studentkotlin',
      name: 'Wendell Cotlin',
      registrationDateTime: new Date(2020, 0, 7, 8).toISOString(),
      roles: STUDENT_ROLE_GROUP,
    },
  ],
  [
    8,
    {
      id: 8,
      username: 'studentjvm',
      name: 'Wendell John Victor Machine',
      registrationDateTime: new Date(2020, 0, 8, 8).toISOString(),
      roles: STUDENT_ROLE_GROUP,
    },
  ],
  [
    9,
    {
      id: 9,
      username: 'studentspring',
      name: 'Wendell Spring',
      registrationDateTime: new Date(2020, 0, 9, 8).toISOString(),
      roles: STUDENT_ROLE_GROUP,
    },
  ],
  [
    10,
    {
      id: 10,
      username: 'studentbackend',
      name: 'Wendell Back End',
      registrationDateTime: new Date(2020, 0, 10, 8).toISOString(),
      roles: STUDENT_ROLE_GROUP,
    },
  ],
  [
    11,
    {
      id: 11,
      username: 'studenttypescript',
      name: 'Wendell Type Script',
      registrationDateTime: new Date(2020, 0, 11, 8).toISOString(),
      roles: STUDENT_ROLE_GROUP,
    },
  ],
  [
    12,
    {
      id: 12,
      username: 'studentreact',
      name: 'Wendell React',
      registrationDateTime: new Date(2020, 0, 12, 8).toISOString(),
      roles: STUDENT_ROLE_GROUP,
    },
  ],
  [
    13,
    {
      id: 13,
      username: 'studentfrontend',
      name: 'Wendell Front End',
      registrationDateTime: new Date(2020, 0, 13, 8).toISOString(),
      roles: STUDENT_ROLE_GROUP,
    },
  ],
  [
    14,
    {
      id: 14,
      username: 'studentdatabase',
      name: 'Wendell Data Base',
      registrationDateTime: new Date(2020, 0, 14, 8).toISOString(),
      roles: STUDENT_ROLE_GROUP,
    },
  ],
  [
    15,
    {
      id: 15,
      username: 'studentdocker',
      name: 'Wendell Docker',
      registrationDateTime: new Date(2020, 0, 15, 8).toISOString(),
      roles: STUDENT_ROLE_GROUP,
    },
  ],
  [
    16,
    {
      id: 16,
      username: 'studentkubernetes',
      name: 'Wendell Kites',
      registrationDateTime: new Date(2020, 0, 16, 8).toISOString(),
      roles: STUDENT_ROLE_GROUP,
    },
  ],
  [
    17,
    {
      id: 17,
      username: 'studentdevops',
      name: 'Wendell Devante Operations',
      registrationDateTime: new Date(2020, 0, 17, 8).toISOString(),
      roles: STUDENT_ROLE_GROUP,
    },
  ],
]);
