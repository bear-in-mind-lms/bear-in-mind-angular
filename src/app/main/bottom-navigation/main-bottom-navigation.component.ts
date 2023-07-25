import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../../routing/app-route';
import { BottomNavigationActionComponent } from '../../shared/bottom-navigation-action/bottom-navigation-action.component';

@Component({
  selector: 'app-main-bottom-navigation',
  standalone: true,
  imports: [RouterLink, BottomNavigationActionComponent],
  templateUrl: './main-bottom-navigation.component.html',
  styleUrls: ['./main-bottom-navigation.component.scss'],
})
export class MainBottomNavigationComponent {
  readonly coursesRoute = AppRoute.courses.routerLink;
  readonly usersRoute = AppRoute.users.routerLink;
}
