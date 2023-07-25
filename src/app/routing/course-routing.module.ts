import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { teacherGuard } from '../auth/teacher.guard';
import { AppRoute } from './app-route';

const routes: Routes = [
  {
    path: AppRoute.conductedCourses.routePath,
    loadComponent: () =>
      import('src/app/course/conducted/conducted-courses-page.component').then(
        (m) => m.ConductedCoursesPageComponent,
      ),
    canActivate: [teacherGuard],
  },
  {
    path: AppRoute.activeCourses.routePath,
    loadComponent: () =>
      import('src/app/course/active/active-courses-page.component').then(
        (m) => m.ActiveCoursesPageComponent,
      ),
  },
  {
    path: AppRoute.availableCourses.routePath,
    loadComponent: () =>
      import('src/app/course/available/available-courses-page.component').then(
        (m) => m.AvailableCoursesPageComponent,
      ),
  },
  {
    path: AppRoute.completedCourses.routePath,
    loadComponent: () =>
      import('src/app/course/completed/completed-courses-page.component').then(
        (m) => m.CompletedCoursesPageComponent,
      ),
  },
  {
    path: AppRoute.createCourse.routePath,
    loadComponent: () =>
      import('src/app/course/creator/page/course-creator-page.component').then(
        (m) => m.CourseCreatorPageComponent,
      ),
    canActivate: [teacherGuard],
  },
  {
    path: AppRoute.courseLesson.routePath,
    loadComponent: () =>
      import('src/app/course/lesson/page/course-lesson-page.component').then(
        (m) => m.CourseLessonPageComponent,
      ),
  },
  {
    path: AppRoute.course.routePath,
    loadComponent: () =>
      import('src/app/course/page/course-page.component').then(
        (m) => m.CoursePageComponent,
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {}
