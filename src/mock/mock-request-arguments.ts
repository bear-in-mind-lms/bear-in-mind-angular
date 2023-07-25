import { BodyType } from '../app/api/api-service';
import { LoggedInUserService } from '../app/auth/logged-in-user.service';
import { ParamsType } from '../app/shared/path-utils';

export type MockRequestDependencies = { loggedInUser: LoggedInUserService };

export type MockRequestArguments = {
  params?: ParamsType;
  pathVariables?: ParamsType;
  body?: BodyType;
  deps: MockRequestDependencies;
};
