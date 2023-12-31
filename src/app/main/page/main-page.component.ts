import { BreakpointObserver } from '@angular/cdk/layout';
import { DomPortal, PortalModule } from '@angular/cdk/portal';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Breakpoint } from '../../layout/breakpoint';
import { DynamicLayoutService } from '../../layout/dynamic-layout.service';
import { AppRoute } from '../../routing/app-route';
import { AppBarComponent } from '../../shared/app-bar/app-bar.component';
import { PageContentComponent } from '../../shared/page/content/page-content.component';
import { MainBottomNavigationComponent } from '../bottom-navigation/main-bottom-navigation.component';
import { MainSideNavigationComponent } from '../side-navigation/main-side-navigation.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    NgIf,
    NgTemplateOutlet,
    PortalModule,
    RouterOutlet,
    AppBarComponent,
    PageContentComponent,
    MainBottomNavigationComponent,
    MainSideNavigationComponent,
  ],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly subscriptions: Subscription[] = [];

  protected sideNavigation = true;
  protected hasBottomNavigation = false;

  @ViewChild('content', { read: ElementRef }) content!: ElementRef<HTMLElement>;

  protected contentPortal!: DomPortal;

  constructor(
    private readonly dynamicLayout: DynamicLayoutService,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.hasBottomNavigation = this.hasRouteBottomNavigation(this.router.url);

    this.subscriptions.push(
      this.breakpointObserver
        .observe([`(min-width: ${Breakpoint.medium}px)`])
        .subscribe((state) => {
          const isMinWidthMedium = state.matches;
          this.sideNavigation = isMinWidthMedium;
          this.dynamicLayout.update(isMinWidthMedium ? Breakpoint.medium : 0);
        }),
    );
    this.subscriptions.push(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event) => {
          this.hasBottomNavigation = this.hasRouteBottomNavigation(
            (event as NavigationEnd).urlAfterRedirects,
          );
        }),
    );
  }

  ngAfterViewInit() {
    this.contentPortal = new DomPortal(this.content);
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  private hasRouteBottomNavigation(route: string) {
    return (
      route === AppRoute.courses.routerLink ||
      route === AppRoute.users.routerLink
    );
  }
}
