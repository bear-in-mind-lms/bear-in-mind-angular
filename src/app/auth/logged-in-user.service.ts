import { Injectable } from '@angular/core';
import { LoginResponseDto } from './login-response-dto';
import { UserRole } from './user-role';

interface LoggedInUser {
  readonly userId: number;
  readonly userFullName: string;
  readonly userImage?: string;
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

  private _userFullName = '';

  get userFullName() {
    return this._userFullName;
  }

  private _userImage?: string;

  get userImage() {
    return this._userImage;
  }

  private roles: string[] = [];

  constructor() {
    const savedLoggedInUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedLoggedInUser !== null) {
      const loggedInUser = JSON.parse(savedLoggedInUser) as LoggedInUser;
      ({
        userId: this._userId,
        userFullName: this._userFullName,
        userImage: this._userImage,
        roles: this.roles,
      } = loggedInUser);
    }
  }

  logIn(loginResponseBody: LoginResponseDto) {
    ({
      userId: this._userId,
      userFullName: this._userFullName,
      userImage: this._userImage,
      authorities: this.roles,
    } = loginResponseBody);
    this.saveToLocalStorage();
  }

  logOut() {
    this._userId = 0;
    this._userFullName = '';
    this._userImage = undefined;
    this.roles = [];
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  hasRole(role: string) {
    return this.roles.includes(role);
  }

  get highestRole() {
    if (this.roles.includes(UserRole.administrator)) {
      return UserRole.administrator;
    } else if (this.roles.includes(UserRole.teacher)) {
      return UserRole.teacher;
    } else {
      return UserRole.student;
    }
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
    return {
      userId: this._userId,
      userFullName: this._userFullName,
      userImage: this._userImage,
      roles: this.roles,
    };
  }
}
