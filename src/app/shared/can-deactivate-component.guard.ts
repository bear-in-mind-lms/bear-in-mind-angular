import { CanDeactivateFn } from '@angular/router';

export interface CanDeactivateComponent {
  readonly getDeactivationMessage: () => string | undefined;
}

export const canDeactivateComponentGuard: CanDeactivateFn<
  CanDeactivateComponent
> = (component) => {
  const deactivationMessage = component.getDeactivationMessage();
  return deactivationMessage === undefined
    ? true
    : confirm(deactivationMessage);
};
