import { EnvironmentProviders, Provider } from '@angular/core';

export type EnvironmentProps = {
  production: boolean;
  apiUrl: string;
  apiService: any;
  providers: (Provider | EnvironmentProviders)[];
};
