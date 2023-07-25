import {
  HttpContextToken,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';

export const IGNORE_CACHE = new HttpContextToken<boolean>(() => true);

/**
 * 15 minutes
 */
const CACHE_LIFESPAN = 1000 * 60 * 15;

interface CachedResponse {
  readonly response: HttpResponse<any>;
  readonly expirationTime: number;
}

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private readonly cache = new Map<string, CachedResponse>();

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const url = req.urlWithParams;
    const now = Date.now();

    if (!req.context.get(IGNORE_CACHE)) {
      const cached = this.cache.get(url);
      if (cached !== undefined && cached.expirationTime >= now) {
        return of(cached.response);
      }
    }

    return next.handle(req).pipe(
      tap((response) => {
        if (response instanceof HttpResponse && response.ok) {
          this.cache.set(url, {
            response: response,
            expirationTime: now + CACHE_LIFESPAN,
          });
        }
      }),
    );
  }
}
