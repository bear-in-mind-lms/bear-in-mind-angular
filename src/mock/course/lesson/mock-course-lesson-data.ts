import { MockCourseLesson } from './mock-course-lesson';

export const mockLessons = new Map<number, MockCourseLesson>([
  // Administration course
  [
    1,
    {
      id: 1,
      courseId: 1,
      ordinal: 1,
      topic: 'Linux',
      parts: [],
    },
  ],
  // Java course
  [
    101,
    {
      id: 101,
      courseId: 2,
      ordinal: 1,
      topic: 'Hello Java World!',
      description: 'World and how to greet it',
      parts: [
        {
          text: '<b><i>Hello</i></b> is a salutation or greeting in the English language.',
        },
        {
          attachments: 'Source:https://en.wikipedia.org/wiki/Hello',
        },
        {
          text: 'It is first attested in writing from 1826.',
          attachments:
            ':https://www.oed.com/\nModern English-Old High German dictionary:https://www.koeblergerhard.de/germanistischewoerterbuecher/althochdeutscheswoerterbuch/neuenglisch-ahd.pdf',
        },
      ],
    },
  ],
  [
    102,
    {
      id: 102,
      courseId: 2,
      ordinal: 2,
      topic: 'Variables',
      description: 'Data types and how to use them',
      parts: [],
    },
  ],
  [
    103,
    {
      id: 103,
      courseId: 2,
      ordinal: 3,
      topic: 'Classes',
      description: 'Classes and how to instantiate them',
      parts: [],
    },
  ],
  // TypeScript course
  [
    401,
    {
      id: 401,
      courseId: 5,
      ordinal: 1,
      topic: 'Hello TypeScript World!',
      parts: [],
    },
  ],
  // Gamification in Education course
  [
    901,
    {
      id: 901,
      courseId: 10,
      ordinal: 1,
      topic: 'What is gamification',
      parts: [],
    },
  ],
]);
