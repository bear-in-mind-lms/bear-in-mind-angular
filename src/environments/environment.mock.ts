import { MockApiControllerService } from '../mock/mock-api-controller.service';
import { MockApiService } from '../mock/mock-api.service';
import { EnvironmentProps } from './environment-props';

export const environment: EnvironmentProps = {
  production: false,
  apiUrl: '',
  apiService: MockApiService,
  providers: [{ provide: MockApiControllerService }],
};
