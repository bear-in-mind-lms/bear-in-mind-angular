import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { injectPathVariables, ParamsType } from '../shared/path-utils';
import { ApiError, unexpectedServerError } from './api-error';
import { ApiResponse } from './api-response';
import { ApiService, BodyType, UrlType } from './api-service';

@Injectable()
export class HttpApiService extends ApiService {
  constructor(private readonly http: HttpClient) {
    super();
  }

  override get<ResponseType>(
    url: UrlType,
  ): Observable<ApiResponse<ResponseType>> {
    return this.request('GET', url);
  }

  override post<ResponseType>(
    url: UrlType,
    body?: BodyType,
  ): Observable<ApiResponse<ResponseType>> {
    return this.request('POST', url, body);
  }

  override put<ResponseType>(
    url: UrlType,
    body?: BodyType,
  ): Observable<ApiResponse<ResponseType>> {
    return this.request('PUT', url, body);
  }

  override delete<ResponseType>(
    url: UrlType,
  ): Observable<ApiResponse<ResponseType>> {
    return this.request('DELETE', url);
  }

  private request<ResponseType>(
    method: string,
    url: UrlType,
    body?: BodyType,
  ): Observable<ApiResponse<ResponseType>> {
    let path = environment.apiUrl;
    let params: ParamsType | undefined;
    if (typeof url === 'string') {
      path += url;
    } else {
      path += url.pathVariables
        ? injectPathVariables(url.path, url.pathVariables)
        : url.path;
      params = url.params;
    }

    return this.http
      .request<ResponseType | ApiError>(method, path, {
        body: body,
        observe: 'response',
        params: params,
        withCredentials: true,
      })
      .pipe(
        map(HttpApiService.mapHttpResponseToApiResponse),
        catchError(() =>
          of(ApiResponse.error<ResponseType>(unexpectedServerError)),
        ),
      );
  }

  private static mapHttpResponseToApiResponse<ResponseType>(
    response: HttpResponse<ResponseType | ApiError>,
  ) {
    const body = response.body;
    if (response.ok) {
      return ApiResponse.success(body as ResponseType);
    }

    const errorBody = body as ApiError;
    return ApiResponse.error<ResponseType>(errorBody ?? unexpectedServerError);
  }
}
