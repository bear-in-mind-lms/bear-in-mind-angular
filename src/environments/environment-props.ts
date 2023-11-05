import { EnvironmentProviders, Provider } from '@angular/core';

export type EnvironmentProps = {
  readonly production: boolean;
  readonly apiUrl: string;
  readonly apiService: any;
  readonly evaluationApiService: any;
  readonly providers: (Provider | EnvironmentProviders)[];
};
