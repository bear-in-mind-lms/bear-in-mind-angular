import { ApiError } from './api-error';

export class ApiResponse<ResponseType> {
  constructor(
    readonly content?: ResponseType,
    readonly error?: ApiError,
  ) {}

  static success<ResponseType>(content?: ResponseType) {
    return new ApiResponse(content);
  }

  static error<ResponseType>(error: ApiError) {
    return new ApiResponse<ResponseType>(undefined, error);
  }

  isSuccess() {
    return this.error === undefined;
  }

  isFailure() {
    return this.error !== undefined;
  }
}
