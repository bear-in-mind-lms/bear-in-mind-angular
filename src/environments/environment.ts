import { EnabledEvaluationApiService } from '../app/api/evaluation/enabled-evaluation-api.service';
import { HttpApiService } from '../app/api/http-api.service';
import { EnvironmentProps } from './environment-props';

export const environment: EnvironmentProps = {
  production: true,
  apiUrl: 'http://localhost:8080',
  apiService: HttpApiService,
  evaluationApiService: EnabledEvaluationApiService,
  providers: [],
};

export const enum EnabledModule {
  evaluation = 1,
}
