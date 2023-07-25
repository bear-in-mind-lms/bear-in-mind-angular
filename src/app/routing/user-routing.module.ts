import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { teacherGuard } from '../auth/teacher.guard';
import { AppRoute } from './app-route';

const routes: Routes = [
  {
    path: AppRoute.registeredUserGroups.routePath,
    loadComponent: () =>
      import(
        'src/app/user/group/registered/registered-user-groups-page.component'
      ).then((m) => m.RegisteredUserGroupsPageComponent),
  },
  {
    path: AppRoute.availableUserGroups.routePath,
    loadComponent: () =>
      import(
        'src/app/user/group/available/available-user-groups-page.component'
      ).then((m) => m.AvailableUserGroupsPageComponent),
  },
  {
    path: AppRoute.groupMembers.routePath,
    loadComponent: () =>
      import('src/app/user/group/member/group-members-page.component').then(
        (m) => m.GroupMembersPageComponent,
      ),
  },
  {
    path: AppRoute.teachers.routePath,
    loadComponent: () =>
      import('src/app/user/teacher/teachers-page.component').then(
        (m) => m.TeachersPageComponent,
      ),
  },
  {
    path: AppRoute.students.routePath,
    loadComponent: () =>
      import('src/app/user/student/students-page.component').then(
        (m) => m.StudentsPageComponent,
      ),
    canActivate: [teacherGuard],
  },
  {
    path: AppRoute.createUserGroup.routePath,
    loadComponent: () =>
      import(
        'src/app/user/group/creator/page/user-group-creator-page.component'
      ).then((m) => m.UserGroupCreatorPageComponent),
  },
  {
    path: AppRoute.userGroup.routePath,
    loadComponent: () =>
      import('src/app/user/group/page/user-group-page.component').then(
        (m) => m.UserGroupPageComponent,
      ),
  },
  {
    path: AppRoute.user.routePath,
    loadComponent: () =>
      import('src/app/user/page/user-page.component').then(
        (m) => m.UserPageComponent,
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
