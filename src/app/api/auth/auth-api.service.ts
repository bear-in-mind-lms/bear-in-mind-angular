import { Injectable } from '@angular/core';
import { CredentialsDto } from '../../auth/credentials-dto';
import { LoginResponseDto } from '../../auth/login-response-dto';
import { ApiService } from '../api-service';

function path(path: string) {
  return `/auth${path}`;
}

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private readonly api: ApiService) {}

  logIn(credentials: CredentialsDto) {
    return this.api.post<LoginResponseDto>(
      { path: path('/login'), params: { client: 'WEB' } },
      credentials,
    );
  }
}
