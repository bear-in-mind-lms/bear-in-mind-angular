import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LocationHistoryService } from './routing/location-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly locationHistoryService: LocationHistoryService,
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart || event instanceof NavigationEnd,
        ),
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.locationHistoryService.handleNavigationStart(event);
        } else {
          this.locationHistoryService.handleNavigationEnd(
            event as NavigationEnd,
          );
        }
      });
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }
}
