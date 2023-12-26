import { ApiResponse } from '../../app/api/api-response';
import { MockRequestArguments } from '../mock-request-arguments';
import { logIn, signUp } from './mock-auth-api';

export const AUTH_PATH_REQUEST_MAP = new Map<
  string,
  (args: MockRequestArguments) => ApiResponse<any>
>([
  ['POST /auth/log-in', (args) => logIn(args.body)],
  ['POST /auth/sign-up', (args) => signUp(args.body)],
]);
