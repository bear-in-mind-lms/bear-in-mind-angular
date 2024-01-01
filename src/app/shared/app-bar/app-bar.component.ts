import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { Location, NgClass, NgIf, NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  DynamicLayoutProps,
  DynamicLayoutService,
} from '../../layout/dynamic-layout.service';
import { LocationHistoryService } from '../../routing/location-history.service';

@Component({
  selector: 'app-app-bar',
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    NgClass,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
})
export class AppBarComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly subscriptions: Subscription[] = [];

  private isProminent!: boolean;
  private backgroundImageUrl?: string;

  protected toolbarWidth?: string;

  protected readonly toolbarHeight = 64;
  protected readonly prominentToolbarHeight = 160;
  protected readonly prominentToolbarContentTop = 48;

  @Input() previousLocation?: string;

  @Input()
  get prominent() {
    return this.isProminent;
  }

  set prominent(value: BooleanInput) {
    this.isProminent = coerceBooleanProperty(value);
  }

  @Input()
  get backgroundImage() {
    return this.backgroundImageUrl;
  }

  set backgroundImage(value: string | undefined) {
    this.backgroundImageUrl = value === undefined ? undefined : `url(${value})`;
  }

  @ViewChild(MatToolbar, { read: ElementRef }) protected toolbar!: ElementRef;
  @ViewChild('toolbarContent', { read: ElementRef })
  protected toolbarContent!: ElementRef;

  constructor(
    private readonly dynamicLayout: DynamicLayoutService,
    private readonly scrollDispatcher: ScrollDispatcher,
    private readonly router: Router,
    private readonly location: Location,
    private readonly locationHistoryService: LocationHistoryService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.dynamicLayout.observe().subscribe(this.handleDynamicLayoutChange),
    );
  }

  ngAfterViewInit() {
    if (this.prominent) {
      this.subscriptions.push(
        this.scrollDispatcher.scrolled().subscribe(this.handleScrolled),
      );
    }
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  protected goBack() {
    const lastLocation = this.locationHistoryService.lastLocation;
    if (lastLocation !== undefined) {
      this.location.back();
    } else {
      this.locationHistoryService.popLocation();
      this.router.navigateByUrl(this.previousLocation!, {
        replaceUrl: true,
      });
    }
  }

  private readonly handleScrolled = () => {
    const height = Math.max(
      this.toolbarHeight,
      this.prominentToolbarHeight - window.scrollY,
    );
    const top = Math.max(
      0,
      this.prominentToolbarContentTop - window.scrollY / 2,
    );
    this.toolbar.nativeElement.style.height = `${height}px`;
    this.toolbarContent.nativeElement.style.top = `${top}px`;
  };

  private readonly handleDynamicLayoutChange = (value: DynamicLayoutProps) => {
    this.toolbarWidth = value.sideNavigation ? 'calc(100% - 256px)' : undefined;
  };
}
