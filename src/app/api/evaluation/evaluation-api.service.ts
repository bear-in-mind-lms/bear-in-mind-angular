import { Observable } from 'rxjs';
import { QuizAnswersViewDto } from '../../evaluation/quiz/answer/quiz-answers-view-dto';
import { QuizEvaluationDto } from '../../evaluation/quiz/answer/quiz-evaluation-dto';
import { QuizListItemDto } from '../../evaluation/quiz/quiz-list-item-dto';
import { QuizViewDto } from '../../evaluation/quiz/quiz-view-dto';
import { QuizAnswersDto } from '../../evaluation/quiz/solving/quiz-answers-dto';
import { QuizSolvingViewDto } from '../../evaluation/quiz/solving/quiz-solving-view-dto';
import { ApiResponse } from '../api-response';

export abstract class EvaluationApiService {
  abstract findQuizViewDtoBy(id: string): Observable<ApiResponse<QuizViewDto>>;

  abstract findQuizSolvingViewDtoBy(
    id: string,
  ): Observable<ApiResponse<QuizSolvingViewDto>>;

  abstract findQuizAnswersViewDtoByQuizIdAndUserId(
    quizId: string,
    userId: number,
  ): Observable<ApiResponse<QuizAnswersViewDto>>;

  abstract findAllCourseLessonQuizBy(
    courseLessonId: number,
  ): Observable<ApiResponse<QuizListItemDto[]>>;

  abstract sendAnswers(
    id: string,
    dto: QuizAnswersDto,
  ): Observable<ApiResponse<any>>;

  abstract evaluate(
    quizId: string,
    userId: number,
    dto: QuizEvaluationDto,
  ): Observable<ApiResponse<any>>;
}
