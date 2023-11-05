import { Injectable } from '@angular/core';
import { ERROR_CODE_NOT_FOUND } from '../app/api/api-error';
import { ApiResponse } from '../app/api/api-response';
import { BodyType } from '../app/api/api-service';
import { LoggedInUserService } from '../app/auth/logged-in-user.service';
import { ParamsType } from '../app/shared/path-utils';
import { AUTH_PATH_REQUEST_MAP } from './auth/mock-auth-paths';
import { COURSE_LESSON_PATH_REQUEST_MAP } from './course/lesson/mock-course-lesson-paths';
import { COURSE_PATH_REQUEST_MAP } from './course/mock-course-paths';
import { EVALUATION_PATH_REQUEST_MAP } from './evaluation/mock-evaluation-paths';
import { MockRequestDependencies } from './mock-request-arguments';
import { USER_GROUP_PATH_REQUEST_MAP } from './user/group/mock-user-group-paths';
import { USER_PATH_REQUEST_MAP } from './user/mock-user-paths';

const PATH_REQUEST_MAP = new Map([
  ...AUTH_PATH_REQUEST_MAP,
  ...COURSE_PATH_REQUEST_MAP,
  ...COURSE_LESSON_PATH_REQUEST_MAP,
  ...EVALUATION_PATH_REQUEST_MAP,
  ...USER_PATH_REQUEST_MAP,
  ...USER_GROUP_PATH_REQUEST_MAP,
]);

@Injectable()
export class MockApiControllerService {
  private readonly dependencies: MockRequestDependencies;

  constructor(private readonly loggedInUser: LoggedInUserService) {
    this.dependencies = {
      loggedInUser: this.loggedInUser,
    };
  }

  request<ResponseType>(
    method: string,
    path: string,
    body?: BodyType,
    params?: ParamsType,
    pathVariables?: ParamsType,
  ): ApiResponse<ResponseType> {
    const methodAndPath = `${method} ${path}`;

    const pathRequestFunction = PATH_REQUEST_MAP.get(methodAndPath);
    if (pathRequestFunction !== undefined) {
      return pathRequestFunction({
        params,
        pathVariables,
        body,
        deps: this.dependencies,
      });
    }

    return ApiResponse.error({ code: ERROR_CODE_NOT_FOUND });
  }
}
