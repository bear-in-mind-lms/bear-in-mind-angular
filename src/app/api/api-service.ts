import { Observable } from 'rxjs';
import { ParamsType } from '../shared/path-utils';
import { ApiResponse } from './api-response';

export type UrlType =
  | string
  | { path: string; params?: ParamsType; pathVariables?: ParamsType };
export type BodyType = any;

export abstract class ApiService {
  abstract get<ResponseType>(
    url: UrlType,
  ): Observable<ApiResponse<ResponseType>>;

  abstract post<ResponseType>(
    url: UrlType,
    body?: BodyType,
  ): Observable<ApiResponse<ResponseType>>;

  abstract put<ResponseType>(
    url: UrlType,
    body?: BodyType,
  ): Observable<ApiResponse<ResponseType>>;

  abstract delete<ResponseType>(
    url: UrlType,
  ): Observable<ApiResponse<ResponseType>>;
}
