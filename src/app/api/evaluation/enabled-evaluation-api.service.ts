import { Injectable } from '@angular/core';
import { QuizEvaluationDto } from 'src/app/evaluation/quiz/answer/quiz-evaluation-dto';
import { QuizAnswersViewDto } from '../../evaluation/quiz/answer/quiz-answers-view-dto';
import { QuizListItemDto } from '../../evaluation/quiz/quiz-list-item-dto';
import { QuizViewDto } from '../../evaluation/quiz/quiz-view-dto';
import { QuizAnswersDto } from '../../evaluation/quiz/solving/quiz-answers-dto';
import { QuizSolvingViewDto } from '../../evaluation/quiz/solving/quiz-solving-view-dto';
import { ApiService } from '../api-service';
import { EvaluationApiService } from './evaluation-api.service';

function path(path: string) {
  return `/evaluation${path}`;
}

@Injectable()
export class EnabledEvaluationApiService extends EvaluationApiService {
  constructor(private readonly api: ApiService) {
    super();
  }

  override findQuizViewDtoBy(id: string) {
    return this.api.get<QuizViewDto>({
      path: path('/quiz/:id'),
      pathVariables: { id },
    });
  }

  override findQuizSolvingViewDtoBy(id: string) {
    return this.api.get<QuizSolvingViewDto>({
      path: path('/quiz/solve/:id'),
      pathVariables: { id },
    });
  }

  override findQuizAnswersViewDtoByQuizIdAndUserId(
    quizId: string,
    userId: number,
  ) {
    return this.api.get<QuizAnswersViewDto>({
      path: path('/quiz/:quizId/answers/:userId'),
      pathVariables: { quizId, userId },
    });
  }

  override findAllCourseLessonQuizBy(courseLessonId: number) {
    return this.api.get<QuizListItemDto[]>({
      path: path('/course/lesson/:courseLessonId/list'),
      pathVariables: { courseLessonId },
    });
  }

  override sendAnswers(id: string, dto: QuizAnswersDto) {
    return this.api.post(
      {
        path: path('/quiz/:id'),
        pathVariables: { id },
      },
      dto,
    );
  }

  override evaluate(quizId: string, userId: number, dto: QuizEvaluationDto) {
    return this.api.put(
      {
        path: path('/quiz/:quizId/evaluate/:userId'),
        pathVariables: { quizId, userId },
      },
      dto,
    );
  }
}
