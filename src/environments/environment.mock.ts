import { EnabledEvaluationApiService } from '../app/api/evaluation/enabled-evaluation-api.service';
import { MockApiControllerService } from '../mock/mock-api-controller.service';
import { MockApiService } from '../mock/mock-api.service';
import { EnvironmentProps } from './environment-props';

export const environment: EnvironmentProps = {
  production: false,
  apiUrl: '',
  apiService: MockApiService,
  evaluationApiService: EnabledEvaluationApiService,
  providers: [{ provide: MockApiControllerService }],
};

export const enum EnabledModule {
  evaluation = 1,
}
