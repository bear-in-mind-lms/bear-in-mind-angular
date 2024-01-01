import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Breakpoint } from './breakpoint';

export interface DynamicLayoutProps {
  readonly sideNavigation: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DynamicLayoutService {
  private readonly propsSubject = new BehaviorSubject<DynamicLayoutProps>({
    sideNavigation: true,
  });

  constructor() {}

  update(breakpoint: number) {
    const sideNavigation = breakpoint >= Breakpoint.medium;
    if (sideNavigation !== this.propsSubject.value.sideNavigation) {
      this.propsSubject.next({ sideNavigation });
    }
  }

  observe() {
    return this.propsSubject.asObservable();
  }
}
