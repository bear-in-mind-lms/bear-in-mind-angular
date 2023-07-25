import { incorrectCredentialsError } from '../../app/api/api-error';
import { ApiResponse } from '../../app/api/api-response';
import { CredentialsDto } from '../../app/auth/credentials-dto';
import { LoginResponseDto } from '../../app/auth/login-response-dto';
import { findUserByUsername } from '../user/mock-user-repository';

/**
 * SHA-256 hash of "password"
 */
const PASSWORD_HASH =
  '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';

export function logIn(
  credentials: CredentialsDto,
): ApiResponse<LoginResponseDto> {
  if (credentials.password !== PASSWORD_HASH) {
    return ApiResponse.error(incorrectCredentialsError);
  }

  const user = findUserByUsername(credentials.username);
  if (user === undefined) {
    return ApiResponse.error(incorrectCredentialsError);
  }

  return ApiResponse.success({
    userId: user.id,
    authorities: user.roles,
  });
}
