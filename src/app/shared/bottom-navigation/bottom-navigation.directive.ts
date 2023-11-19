import { Directive } from '@angular/core';

@Directive({
  selector: '[appBottomNavigation]',
  host: {
    '[style.position]': '"fixed"',
    '[style.bottom]': '"0"',
    '[style.z-index]': '"1000"',
    '[style.width]': '"100%"',
    '[style.height]': '"64px"',
  },
  standalone: true,
})
export class BottomNavigationDirective {}
