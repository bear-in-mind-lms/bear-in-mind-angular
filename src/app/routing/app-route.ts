const PARAM_ID = 'id';
const PARAM_QUIZ_ID = 'quizId';
const PARAM_USER_ID = 'userId';
const PARAM_COURSE_LESSON_ID = 'courseLessonId';

export const AppRouteParam = {
  id: PARAM_ID,
  quizId: PARAM_QUIZ_ID,
  userId: PARAM_USER_ID,
  courseLessonId: PARAM_COURSE_LESSON_ID,
} as const;

interface Paths {
  readonly routePath: string;
  readonly routerLink: string;
}

// Login

const login: Paths = { routePath: 'login', routerLink: '/login' };

// Main

const main: Paths = { routePath: '', routerLink: '/' };

// Main -> Courses

const courses: Paths = {
  routePath: 'courses',
  routerLink: '/courses',
};

const createCourse: Paths = {
  routePath: 'create',
  routerLink: `${courses.routerLink}/create`,
};

const course: Paths = {
  routePath: `:${PARAM_ID}`,
  routerLink: `${courses.routerLink}/:${PARAM_ID}`,
};

const conductedCourses: Paths = {
  routePath: `conducted`,
  routerLink: `${courses.routerLink}/conducted`,
};

const activeCourses: Paths = {
  routePath: `active`,
  routerLink: `${courses.routerLink}/active`,
};
const availableCourses: Paths = {
  routePath: `available`,
  routerLink: `${courses.routerLink}/available`,
};
const completedCourses: Paths = {
  routePath: `completed`,
  routerLink: `${courses.routerLink}/completed`,
};

// Main -> Courses -> Course lessons

const courseLessons: Paths = {
  routePath: 'lessons',
  routerLink: `${courses.routerLink}/lessons`,
};

const courseLesson: Paths = {
  routePath: `${courseLessons.routePath}/:${PARAM_ID}`,
  routerLink: `${courseLessons.routerLink}/:${PARAM_ID}`,
};

// Main -> Users

const users: Paths = {
  routePath: 'people',
  routerLink: '/people',
};

const user: Paths = {
  routePath: `:${PARAM_ID}`,
  routerLink: `${users.routerLink}/:${PARAM_ID}`,
};

const groupMembers: Paths = {
  routePath: `group-members`,
  routerLink: `${users.routerLink}/group-members`,
};
const students: Paths = {
  routePath: `students`,
  routerLink: `${users.routerLink}/students`,
};
const teachers: Paths = {
  routePath: `teachers`,
  routerLink: `${users.routerLink}/teachers`,
};

// Main -> Users -> User groups

const userGroups: Paths = {
  routePath: `groups`,
  routerLink: `${users.routerLink}/groups`,
};

const userGroup: Paths = {
  routePath: `${userGroups.routePath}/:${PARAM_ID}`,
  routerLink: `${userGroups.routerLink}/:${PARAM_ID}`,
};

const createUserGroup: Paths = {
  routePath: `${userGroups.routePath}/create`,
  routerLink: `${userGroups.routerLink}/create`,
};

const registeredUserGroups: Paths = {
  routePath: `${userGroups.routePath}/registered`,
  routerLink: `${userGroups.routerLink}/registered`,
};
const availableUserGroups: Paths = {
  routePath: `${userGroups.routePath}/available`,
  routerLink: `${userGroups.routerLink}/available`,
};

// Evaluation

const evaluation: Paths = {
  routePath: 'evaluation',
  routerLink: '/evaluation',
};

const quiz: Paths = {
  routePath: `quizzes/:${PARAM_ID}`,
  routerLink: `${evaluation.routerLink}/quizzes/:${PARAM_ID}`,
};

const solveQuiz: Paths = {
  routePath: `quizzes/:${PARAM_ID}/solve`,
  routerLink: `${evaluation.routerLink}/quizzes/:${PARAM_ID}/solve`,
};

const quizAnswers: Paths = {
  routePath: `lessons/:${PARAM_COURSE_LESSON_ID}/quizzes/:${PARAM_QUIZ_ID}/students/:${PARAM_USER_ID}/answers`,
  routerLink: `${evaluation.routerLink}/lessons/:${PARAM_COURSE_LESSON_ID}/quizzes/:${PARAM_QUIZ_ID}/students/:${PARAM_USER_ID}/answers`,
};

export const AppRoute = {
  activeCourses,
  availableCourses,
  availableUserGroups,
  completedCourses,
  conductedCourses,
  course,
  courseLesson,
  courses,
  createCourse,
  createUserGroup,
  defaultMainSubpage: courses,
  evaluation,
  groupMembers,
  login,
  main,
  quiz,
  quizAnswers,
  registeredUserGroups,
  solveQuiz,
  students,
  teachers,
  user,
  userGroup,
  users,
} as const;
