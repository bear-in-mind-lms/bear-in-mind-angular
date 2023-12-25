import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import {
  CanDeactivateComponent,
  canDeactivateComponentGuard,
} from './can-deactivate-component.guard';

describe('canDeactivateComponentGuard', () => {
  const executeGuard: CanDeactivateFn<CanDeactivateComponent> = (
    ...guardParameters
  ) =>
    TestBed.runInInjectionContext(() =>
      canDeactivateComponentGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
