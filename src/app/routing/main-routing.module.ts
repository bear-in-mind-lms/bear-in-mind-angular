import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoute } from './app-route';

const routes: Routes = [
  {
    path: AppRoute.courses.routePath,
    loadComponent: () =>
      import('src/app/course/page/courses-page.component').then(
        (m) => m.CoursesPageComponent,
      ),
  },
  {
    path: AppRoute.users.routePath,
    loadComponent: () =>
      import('src/app/user/group/page/user-groups-page.component').then(
        (m) => m.UserGroupsPageComponent,
      ),
  },
  {
    path: AppRoute.courses.routePath,
    loadChildren: () =>
      import('./course-routing.module').then((m) => m.CourseRoutingModule),
  },
  {
    path: AppRoute.users.routePath,
    loadChildren: () =>
      import('./user-routing.module').then((m) => m.UserRoutingModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoute.defaultMainSubpage.routePath,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
