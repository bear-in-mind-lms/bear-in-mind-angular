import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart } from '@angular/router';

type NavigationTrigger = 'imperative' | 'popstate' | 'hashchange';

@Injectable({
  providedIn: 'root',
})
export class LocationHistoryService {
  private readonly locationStack: string[] = [];

  private readonly ongoingNavigationTriggers = new Map<
    number,
    NavigationTrigger | undefined
  >();

  get lastLocation() {
    return this.locationStack.at(-2);
  }

  popLocation() {
    this.locationStack.pop();
  }

  handleNavigationStart(event: NavigationStart) {
    this.ongoingNavigationTriggers.set(event.id, event.navigationTrigger);
  }

  handleNavigationEnd(event: NavigationEnd) {
    const url = event.urlAfterRedirects;
    switch (this.ongoingNavigationTriggers.get(event.id)) {
      case 'imperative': {
        this.locationStack.push(url);
        break;
      }
      case 'popstate': {
        if (url === this.lastLocation) {
          // Went backward
          this.locationStack.pop();
        } else {
          // Went forward
          this.locationStack.push(url);
        }
        break;
      }
    }

    this.ongoingNavigationTriggers.delete(event.id);
  }
}
