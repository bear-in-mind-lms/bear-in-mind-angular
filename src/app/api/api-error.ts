export interface ApiError {
  readonly code: string;
  readonly arguments?: string[];
}

const ERROR_CODE_CANNOT_ENROLL = 'CANNOT_ENROLL';
const ERROR_CODE_CANNOT_SIGN_UP_FOR_GROUP = 'CANNOT_SIGN_UP_FOR_GROUP';
const ERROR_CODE_CONNECTION_FAILED = 'CONNECTION_FAILED';
const ERROR_CODE_INCORRECT_CREDENTIALS = 'INCORRECT_CREDENTIALS';
export const ERROR_CODE_NOT_FOUND = 'NOT_FOUND';
const ERROR_CODE_UNEXPECTED = 'UNEXPECTED';

export const connectionFailedError: ApiError = {
  code: ERROR_CODE_CONNECTION_FAILED,
} as const;

export const incorrectCredentialsError: ApiError = {
  code: ERROR_CODE_INCORRECT_CREDENTIALS,
} as const;

export const unexpectedServerError: ApiError = {
  code: ERROR_CODE_UNEXPECTED,
} as const;

export function getApiErrorMessage(error: ApiError) {
  switch (error.code) {
    case ERROR_CODE_CANNOT_ENROLL: {
      return $localize`:@@errorCannotEnrollInCourse:`;
    }
    case ERROR_CODE_CANNOT_SIGN_UP_FOR_GROUP: {
      return $localize`:@@errorCannotSignUpForGroup:`;
    }
    case ERROR_CODE_CONNECTION_FAILED: {
      return $localize`:@@errorConnectionToServerFailed:`;
    }
    case ERROR_CODE_INCORRECT_CREDENTIALS: {
      return $localize`:@@errorIncorrectCredentials:`;
    }
    case ERROR_CODE_NOT_FOUND: {
      return $localize`:@@errorResourceNotFound:`;
    }
    case ERROR_CODE_UNEXPECTED:
    default: {
      return $localize`:@@errorUnexpectedServerError:`;
    }
  }
}
