import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-navigation-action',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    RouterLink,
    RouterLinkActive,
    MatRippleModule,
    MatIconModule,
  ],
  templateUrl: './bottom-navigation-action.component.html',
  styleUrls: ['./bottom-navigation-action.component.scss'],
})
export class BottomNavigationActionComponent {
  @Input() icon?: string;
  @Input() label?: string;
  @Input({ required: true }) route!: string;
}
