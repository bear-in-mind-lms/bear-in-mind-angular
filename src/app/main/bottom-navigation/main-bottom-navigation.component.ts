import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../../routing/app-route';
import { BottomNavigationActionComponent } from '../../shared/bottom-navigation/action/bottom-navigation-action.component';
import { BottomNavigationDirective } from '../../shared/bottom-navigation/bottom-navigation.directive';

@Component({
  selector: 'app-main-bottom-navigation',
  standalone: true,
  imports: [
    RouterLink,
    BottomNavigationDirective,
    BottomNavigationActionComponent,
  ],
  templateUrl: './main-bottom-navigation.component.html',
  styleUrls: ['./main-bottom-navigation.component.scss'],
})
export class MainBottomNavigationComponent {
  protected readonly coursesRoute = AppRoute.courses.routerLink;
  protected readonly usersRoute = AppRoute.users.routerLink;
}
