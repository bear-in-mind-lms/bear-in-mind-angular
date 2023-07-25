import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '../app/api/api-response';
import { ApiService, BodyType, UrlType } from '../app/api/api-service';
import { injectPathVariables, ParamsType } from '../app/shared/path-utils';
import { MockApiControllerService } from './mock-api-controller.service';

const RESPONSE_DELAY = 250;

function resolvePath(url: UrlType) {
  if (typeof url === 'string') {
    return url;
  }

  let resolvedPath = url.pathVariables
    ? injectPathVariables(url.path, url.pathVariables)
    : url.path;

  if (url.params !== undefined) {
    const paramValues: string[] = [];
    for (const paramName in url.params) {
      paramValues.push(`${paramName}=${url.params[paramName]}`);
    }

    resolvedPath = `${resolvedPath}?${paramValues.join('&')}`;
  }

  return resolvedPath;
}

@Injectable()
export class MockApiService extends ApiService {
  constructor(private readonly apiController: MockApiControllerService) {
    super();
  }

  get<ResponseType>(url: UrlType): Observable<ApiResponse<ResponseType>> {
    return this.request('GET', url);
  }

  post<ResponseType>(
    url: UrlType,
    body?: BodyType,
  ): Observable<ApiResponse<ResponseType>> {
    return this.request('POST', url, body);
  }

  put<ResponseType>(
    url: UrlType,
    body?: BodyType,
  ): Observable<ApiResponse<ResponseType>> {
    return this.request('PUT', url, body);
  }

  delete<ResponseType>(url: UrlType): Observable<ApiResponse<ResponseType>> {
    return this.request('DELETE', url);
  }

  private request<ResponseType>(
    method: string,
    url: UrlType,
    body?: BodyType,
  ): Observable<ApiResponse<ResponseType>> {
    let path: string;
    let params: ParamsType | undefined;
    let pathVariables: ParamsType | undefined;
    if (typeof url === 'string') {
      path = url;
    } else {
      path = url.path;
      params = url.params;
      pathVariables = url.pathVariables;
    }

    const methodAndResolvedPath = `${method} ${resolvePath(url)}`;

    console.log(`Request  '${methodAndResolvedPath}': body =`, body);
    const responseObservable = of(
      this.apiController.request<ResponseType>(
        method,
        path,
        body,
        params,
        pathVariables,
      ),
    ).pipe(delay(RESPONSE_DELAY));

    responseObservable
      .pipe(
        tap((response) =>
          console.log(`Response '${methodAndResolvedPath}': body =`, response),
        ),
      )
      .subscribe();

    return responseObservable;
  }
}
