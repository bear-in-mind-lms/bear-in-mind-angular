import { ApiResponse } from '../../app/api/api-response';
import { QuizAnswersViewDto } from '../../app/evaluation/quiz/answer/quiz-answers-view-dto';
import { QuizEvaluationDto } from '../../app/evaluation/quiz/answer/quiz-evaluation-dto';
import { QuizListItemDto } from '../../app/evaluation/quiz/quiz-list-item-dto';
import { QuizStatus } from '../../app/evaluation/quiz/quiz-status';
import { QuizViewDto } from '../../app/evaluation/quiz/quiz-view-dto';
import { QuizAnswersDto } from '../../app/evaluation/quiz/solving/quiz-answers-dto';
import { QuizSolvingViewDto } from '../../app/evaluation/quiz/solving/quiz-solving-view-dto';
import { tryEvaluateFieldAutomatically } from './form/mock-form';
import { MockQuizResultAnswer } from './quiz/mock-quiz';
import {
  findAnswersByQuizAndUserId,
  findQuizById,
  findQuizzesByCourseLesson,
  findTotalPointsByQuizResult,
} from './quiz/mock-quiz-repository';

export function findQuizViewDtoBy(
  id: string,
  loggedInUserId: number,
): ApiResponse<QuizViewDto> {
  const quiz = findQuizById(id)!;
  const result = quiz.userResults.get(loggedInUserId);
  return ApiResponse.success({
    name: quiz.name,
    status: result?.status ?? QuizStatus.toDo,
    questionCount: quiz.form.sections.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.fields.length,
      0,
    ),
    grade: result?.grade,
    result:
      result?.status === QuizStatus.passed ||
      result?.status === QuizStatus.failed
        ? findTotalPointsByQuizResult(result)
        : undefined,
    maxPoints: quiz.maxPoints,
    submittedAt: result?.submittedAt,
    evaluatedAt: result?.evaluatedAt,
  });
}

export function findQuizSolvingViewDtoBy(
  id: string,
): ApiResponse<QuizSolvingViewDto> {
  const quiz = findQuizById(id)!;
  return ApiResponse.success({
    name: quiz.name,
    sections: quiz.form.sections,
  });
}

export function findQuizAnswersViewDtoByQuizIdAndUserId(
  quizId: string,
  userId: number,
): ApiResponse<QuizAnswersViewDto> {
  const quiz = findQuizById(quizId)!;
  const answers = findAnswersByQuizAndUserId(quiz, userId);

  return ApiResponse.success({
    name: quiz.name,
    courseLessonId: quiz.courseLessonId,
    grades: quiz.grades,
    answers: answers,
  });
}

export function findAllCourseLessonQuizBy(
  courseLessonId: number,
  loggedInUserId: number,
): ApiResponse<QuizListItemDto[]> {
  const quizzes = findQuizzesByCourseLesson(loggedInUserId, courseLessonId);
  return ApiResponse.success(quizzes);
}

export function sendAnswers(
  id: string,
  dto: QuizAnswersDto,
  loggedInUserId: number,
): ApiResponse<any> {
  const quiz = findQuizById(id)!;
  const fields = quiz.form.sections.flatMap((section) => section.fields);
  const answerEntries: [string, MockQuizResultAnswer][] = [];
  for (const field of fields) {
    const answer = dto.answers[field.id];
    const points = tryEvaluateFieldAutomatically(field, answer);
    answerEntries.push([
      field.id,
      {
        answer: answer,
        points: points,
        automatic: points === undefined ? undefined : true,
      },
    ]);
  }

  quiz.userResults.set(loggedInUserId, {
    status: QuizStatus.sent,
    submittedAt: new Date(Date.now()).toISOString(),
    answers: new Map(answerEntries),
  });

  return ApiResponse.success();
}

export function evaluate(
  quizId: string,
  userId: number,
  dto: QuizEvaluationDto,
): ApiResponse<any> {
  const quiz = findQuizById(quizId)!;
  const userResult = quiz.userResults.get(userId)!;

  let result = [...userResult.answers!.values()].reduce(
    (previousValue, currentValue) =>
      previousValue + (currentValue.automatic ? currentValue.points! : 0),
    0,
  );

  for (const fieldId in dto.evaluation) {
    const points = dto.evaluation[fieldId];
    result += points;
    userResult.answers!.set(fieldId, {
      answer: userResult.answers!.get(fieldId)!.answer,
      points: points,
      automatic: false,
    });
  }

  const percentageResult = result / quiz.maxPoints;
  const { name: gradeName, passed } = quiz.grades.find(
    (grade) => percentageResult >= grade.minimumPercentage,
  )!;

  quiz.userResults.set(userId, {
    status: passed ? QuizStatus.passed : QuizStatus.failed,
    submittedAt: userResult.submittedAt,
    evaluatedAt: new Date(Date.now()).toISOString(),
    grade: gradeName,
    answers: userResult.answers,
  });

  return ApiResponse.success();
}
