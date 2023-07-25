import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { LoggedInUserService } from '../../auth/logged-in-user.service';
import { UserRole } from '../../auth/user-role';
import { AppRoute } from '../../routing/app-route';

interface NavigationChildNode {
  readonly name: string;
  readonly route: string;
  readonly requiredRole?: string;
}

interface NavigationNode extends NavigationChildNode {
  readonly icon?: string;
  readonly children?: NavigationChildNode[];
}

function copyNodeAndReplaceChildren(
  node: NavigationNode,
  children: NavigationChildNode[],
): NavigationNode {
  return {
    name: node.name,
    route: node.route,
    requiredRole: node.requiredRole,
    icon: node.icon,
    children: children,
  };
}

const NAVIGATION_NODES: NavigationNode[] = [
  {
    name: $localize`:@@courses:`,
    route: AppRoute.courses.routerLink,
    icon: 'school',
    children: [
      {
        name: $localize`:@@createCourse:`,
        route: AppRoute.createCourse.routerLink,
        requiredRole: UserRole.teacher,
      },
      {
        name: $localize`:@@conductedCourses:`,
        route: AppRoute.conductedCourses.routerLink,
        requiredRole: UserRole.teacher,
      },
      {
        name: $localize`:@@activeCourses:`,
        route: AppRoute.activeCourses.routerLink,
      },
      {
        name: $localize`:@@availableCourses:`,
        route: AppRoute.availableCourses.routerLink,
      },
      {
        name: $localize`:@@completedCourses:`,
        route: AppRoute.completedCourses.routerLink,
      },
    ],
  },
  {
    name: $localize`:@@people:`,
    route: AppRoute.users.routerLink,
    icon: 'group',
    children: [
      {
        name: $localize`:@@myGroups:`,
        route: AppRoute.registeredUserGroups.routerLink,
      },
      {
        name: $localize`:@@createUserGroup:`,
        route: AppRoute.createUserGroup.routerLink,
      },
      {
        name: $localize`:@@availableGroups:`,
        route: AppRoute.availableUserGroups.routerLink,
      },
      {
        name: $localize`:@@myGroupMates:`,
        route: AppRoute.groupMembers.routerLink,
      },
      {
        name: $localize`:@@myTeachers:`,
        route: AppRoute.teachers.routerLink,
      },
      {
        name: $localize`:@@myStudents:`,
        route: AppRoute.students.routerLink,
        requiredRole: UserRole.teacher,
      },
    ],
  },
];

@Component({
  selector: 'app-main-side-navigation',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './main-side-navigation.component.html',
  styleUrls: ['./main-side-navigation.component.scss'],
})
export class MainSideNavigationComponent implements OnInit {
  navigationNodes!: NavigationNode[];

  constructor(private readonly loggedInUser: LoggedInUserService) {}

  ngOnInit() {
    this.navigationNodes = NAVIGATION_NODES.map((parent) => {
      const children = parent.children;
      if (children === undefined) {
        return parent;
      }

      const filteredChildren = children.filter(
        (child) =>
          child.requiredRole === undefined ||
          this.loggedInUser.hasRole(child.requiredRole),
      );
      return copyNodeAndReplaceChildren(parent, filteredChildren);
    });
  }
}
