import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { moduleDisabledError } from '../api-error';
import { ApiResponse } from '../api-response';
import { EvaluationApiService } from './evaluation-api.service';

@Injectable()
export class DisabledEvaluationApiService extends EvaluationApiService {
  override findQuizViewDtoBy() {
    return of(ApiResponse.error<any>(moduleDisabledError));
  }

  override findQuizSolvingViewDtoBy() {
    return of(ApiResponse.error<any>(moduleDisabledError));
  }

  override findQuizAnswersViewDtoByQuizIdAndUserId() {
    return of(ApiResponse.error<any>(moduleDisabledError));
  }

  override findAllCourseLessonQuizBy() {
    return of(ApiResponse.error<any>(moduleDisabledError));
  }

  override sendAnswers() {
    return of(ApiResponse.error(moduleDisabledError));
  }

  override evaluate() {
    return of(ApiResponse.error(moduleDisabledError));
  }
}
