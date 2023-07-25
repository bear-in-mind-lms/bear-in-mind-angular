import { HttpApiService } from '../app/api/http-api.service';
import { EnvironmentProps } from './environment-props';

export const environment: EnvironmentProps = {
  production: true,
  apiUrl: 'http://localhost:8080',
  apiService: HttpApiService,
  providers: [],
};
