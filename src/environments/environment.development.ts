import { HttpApiService } from '../app/api/http-api.service';
import { EnvironmentProps } from './environment-props';

export const environment: EnvironmentProps = {
  production: false,
  apiUrl: 'http://localhost:8080',
  apiService: HttpApiService,
  providers: [],
};
