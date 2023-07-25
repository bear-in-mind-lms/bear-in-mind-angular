import { ApiResponse } from '../../app/api/api-response';
import { MockRequestArguments } from '../mock-request-arguments';
import { logIn } from './mock-auth-api';

export const AUTH_PATH_REQUEST_MAP = new Map<
  string,
  (args: MockRequestArguments) => ApiResponse<any>
>([['POST /auth/login', (args) => logIn(args.body)]]);
