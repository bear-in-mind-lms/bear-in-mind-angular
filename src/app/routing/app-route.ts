const PARAM_ID = 'id';

export const AppRouteParam = {
  id: PARAM_ID,
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

export const AppRoute = {
  activeCourses: activeCourses,
  availableCourses: availableCourses,
  availableUserGroups: availableUserGroups,
  completedCourses: completedCourses,
  conductedCourses: conductedCourses,
  course: course,
  courseLesson: courseLesson,
  courses: courses,
  createCourse: createCourse,
  createUserGroup: createUserGroup,
  defaultMainSubpage: courses,
  groupMembers: groupMembers,
  login: login,
  main: main,
  registeredUserGroups: registeredUserGroups,
  students: students,
  teachers: teachers,
  user: user,
  userGroup: userGroup,
  users: users,
} as const;
