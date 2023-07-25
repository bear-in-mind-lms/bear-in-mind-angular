import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-content',
  standalone: true,
  imports: [NgClass],
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss'],
})
export class PageContentComponent {
  private hasTopMargin = false;
  private hasHorizontalMargin = false;
  private hasAppBar = false;
  private hasProminentAppBar = false;
  private hasBottomNavigation = false;
  private hasFab = false;

  @Input()
  get topMargin() {
    return this.hasTopMargin;
  }

  set topMargin(value: BooleanInput) {
    this.hasTopMargin = coerceBooleanProperty(value);
  }

  @Input()
  get horizontalMargin() {
    return this.hasHorizontalMargin;
  }

  set horizontalMargin(value: BooleanInput) {
    this.hasHorizontalMargin = coerceBooleanProperty(value);
  }

  @Input()
  get appBar() {
    return this.hasAppBar;
  }

  set appBar(value: BooleanInput) {
    this.hasAppBar = coerceBooleanProperty(value);
  }

  @Input()
  get prominentAppBar() {
    return this.hasProminentAppBar;
  }

  set prominentAppBar(value: BooleanInput) {
    this.hasProminentAppBar = coerceBooleanProperty(value);
  }

  @Input()
  get bottomNavigation() {
    return this.hasBottomNavigation;
  }

  set bottomNavigation(value: BooleanInput) {
    this.hasBottomNavigation = coerceBooleanProperty(value);
  }

  @Input()
  get fab() {
    return this.hasFab;
  }

  set fab(value: BooleanInput) {
    this.hasFab = coerceBooleanProperty(value);
  }
}
