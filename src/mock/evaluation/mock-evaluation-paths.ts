import { ApiResponse } from '../../app/api/api-response';
import { MockRequestArguments } from '../mock-request-arguments';
import {
  evaluate,
  findAllCourseLessonQuizBy,
  findQuizAnswersViewDtoByQuizIdAndUserId,
  findQuizSolvingViewDtoBy,
  findQuizViewDtoBy,
  sendAnswers,
} from './mock-evaluation-api';

export const EVALUATION_PATH_REQUEST_MAP = new Map<
  string,
  (args: MockRequestArguments) => ApiResponse<any>
>([
  [
    'GET /evaluation/quiz/:id',
    (args) =>
      findQuizViewDtoBy(
        args.pathVariables!['id'] as string,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'GET /evaluation/quiz/solve/:id',
    (args) => findQuizSolvingViewDtoBy(args.pathVariables!['id'] as string),
  ],
  [
    'GET /evaluation/quiz/:quizId/answers/:userId',
    (args) =>
      findQuizAnswersViewDtoByQuizIdAndUserId(
        args.pathVariables!['quizId'] as string,
        args.pathVariables!['userId'] as number,
      ),
  ],
  [
    'GET /evaluation/course/lesson/:courseLessonId/list',
    (args) =>
      findAllCourseLessonQuizBy(
        args.pathVariables!['courseLessonId'] as number,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'POST /evaluation/quiz/:id',
    (args) =>
      sendAnswers(
        args.pathVariables!['id'] as string,
        args.body,
        args.deps.loggedInUser.userId,
      ),
  ],
  [
    'PUT /evaluation/quiz/:quizId/evaluate/:userId',
    (args) =>
      evaluate(
        args.pathVariables!['quizId'] as string,
        args.pathVariables!['userId'] as number,
        args.body,
      ),
  ],
]);
