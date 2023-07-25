import { Injectable } from '@angular/core';
import { LoginResponseDto } from './login-response-dto';

interface LoggedInUser {
  readonly userId: number;
  readonly roles: string[];
}

const LOCAL_STORAGE_KEY = 'loggedInUser';

@Injectable({
  providedIn: 'root',
})
export class LoggedInUserService {
  private _userId = 0;

  get userId() {
    return this._userId;
  }

  private roles: string[] = [];

  constructor() {
    const savedLoggedInUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedLoggedInUser !== null) {
      const loggedInUser = JSON.parse(savedLoggedInUser) as LoggedInUser;
      this._userId = loggedInUser.userId;
      this.roles = loggedInUser.roles;
    }
  }

  logIn(loginResponseBody: LoginResponseDto) {
    this._userId = loginResponseBody.userId;
    this.roles = loginResponseBody.authorities;
    this.saveToLocalStorage();
  }

  hasRole(role: string) {
    return this.roles.includes(role);
  }

  get exists() {
    return this.roles.length > 0;
  }

  private saveToLocalStorage() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(this.toLocalStorageObject()),
    );
  }

  private toLocalStorageObject(): LoggedInUser {
    return { userId: this._userId, roles: this.roles };
  }
}
