import { QuizListItemDto } from '../../../app/evaluation/quiz/quiz-list-item-dto';
import { QuizStatus } from '../../../app/evaluation/quiz/quiz-status';
import { findCourseLessonById } from '../../course/lesson/mock-course-lesson-repository';
import { MockCourse } from '../../course/mock-course';
import {
  findCourseById,
  isUserTeacherInCourse,
} from '../../course/mock-course-repository';
import { findUserById } from '../../user/mock-user-repository';
import { MockQuiz, MockQuizResult, MockQuizResultAnswer } from './mock-quiz';
import { mockQuizzes } from './mock-quiz-data';

export function findQuizById(id: string) {
  return mockQuizzes.get(id);
}

export function findTotalPointsByQuizResult(
  result: MockQuizResult | undefined,
) {
  if (result === undefined) {
    return undefined;
  }

  return result?.answers === undefined
    ? undefined
    : findTotalPointsByQuizAnswers([...result?.answers.values()]);
}

function findTotalPointsByQuizAnswers(answers: MockQuizResultAnswer[]) {
  return answers.reduce(
    (previousValue, currentValue) => previousValue + (currentValue.points ?? 0),
    0,
  );
}

export function findAnswersByQuizAndUserId(quiz: MockQuiz, userId: number) {
  const fields = quiz.form.sections.flatMap((section) => section.fields);
  const result = quiz.userResults.get(userId)!;

  return [...result.answers!.entries()].map(([fieldId, resultAnswer]) => {
    const field = fields.find((field) => field.id === fieldId)!;

    return {
      id: field.id,
      label: field.label,
      value: resultAnswer.answer,
      maxPoints: field.maxPoints,
      points:
        resultAnswer.points === undefined
          ? undefined
          : {
              value: resultAnswer.points,
              automatic: resultAnswer.automatic!,
            },
    };
  });
}

export function findQuizzesByCourseLesson(
  loggedInUserId: number,
  courseLessonId: number,
) {
  const user = findUserById(loggedInUserId)!;
  const lesson = findCourseLessonById(courseLessonId)!;
  const course = findCourseById(lesson.courseId)!;
  const isTeacher = isUserTeacherInCourse(user, course);

  return [...mockQuizzes.values()]
    .filter((quiz) => quiz.courseLessonId === courseLessonId)
    .flatMap((quiz) =>
      mapMockQuizToQuizListItemDto(quiz, course, loggedInUserId, isTeacher),
    );
}

function mapMockQuizToQuizListItemDto(
  quiz: MockQuiz,
  course: MockCourse,
  userId: number,
  isTeacher: boolean,
): QuizListItemDto[] {
  if (isTeacher) {
    return course.students.map((user) => {
      const result = quiz.userResults.get(user.id);
      return {
        id: quiz.id,
        name: quiz.name,
        status: result?.status ?? QuizStatus.toDo,
        userId: user.id,
        userName: user.name,
        grade: result?.grade,
        result: findTotalPointsByQuizResult(result),
        maxPoints: quiz.maxPoints,
      };
    });
  } else {
    const result = quiz.userResults.get(userId);
    return [
      {
        id: quiz.id,
        name: quiz.name,
        status: result?.status ?? QuizStatus.toDo,
        grade: result?.grade,
        result: findTotalPointsByQuizResult(result),
        maxPoints: quiz.maxPoints,
      },
    ];
  }
}
