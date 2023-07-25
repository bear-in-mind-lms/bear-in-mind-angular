import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userGuard } from '../auth/user.guard';
import { MainPageComponent } from '../main/page/main-page.component';
import { AppRoute } from './app-route';

const routes: Routes = [
  {
    path: AppRoute.main.routePath,
    component: MainPageComponent,
    loadChildren: () =>
      import('./main-routing.module').then((m) => m.MainRoutingModule),
    canActivate: [userGuard],
  },
  {
    path: AppRoute.login.routePath,
    loadComponent: () =>
      import('src/app/auth/login/page/login-page.component').then(
        (m) => m.LoginPageComponent,
      ),
  },
  {
    path: '404',
    loadComponent: () =>
      import('src/app/error/not-found/not-found-page.component').then(
        (m) => m.NotFoundPageComponent,
      ),
  },
  {
    path: '403',
    loadComponent: () =>
      import('src/app/error/forbidden/forbidden-page.component').then(
        (m) => m.ForbiddenPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
