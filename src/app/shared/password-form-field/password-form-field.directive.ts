import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPasswordFormField]',
  standalone: true,
})
export class PasswordFormFieldDirective implements AfterViewInit {
  private obscure = true;

  constructor(private readonly elementRef: ElementRef) {}

  ngAfterViewInit() {
    const nativeElement = this.elementRef.nativeElement;
    const input = nativeElement.querySelector('[matInput]');
    const iconButton = nativeElement.querySelector('[mat-icon-button]');
    const iconButtonIcon = iconButton.querySelector('mat-icon');

    this.updateElements(input, iconButtonIcon);

    iconButton.onclick = () => {
      this.obscure = !this.obscure;
      this.updateElements(input, iconButtonIcon);
    };
  }

  private updateElements(input: HTMLInputElement, icon: HTMLElement) {
    input.type = this.obscure ? 'password' : 'text';
    icon.innerText = this.obscure ? 'visibility_off' : 'visibility';
  }
}
