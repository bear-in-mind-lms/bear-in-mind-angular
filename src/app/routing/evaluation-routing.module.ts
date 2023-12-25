import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canDeactivateComponentGuard } from '../shared/can-deactivate-component.guard';
import { AppRoute } from './app-route';

const routes: Routes = [
  {
    path: AppRoute.solveQuiz.routePath,
    loadComponent: () =>
      import(
        'src/app/evaluation/quiz/solving/page/quiz-solving-page.component'
      ).then((m) => m.QuizSolvingPageComponent),
    canDeactivate: [canDeactivateComponentGuard],
  },
  {
    path: AppRoute.quizAnswers.routePath,
    loadComponent: () =>
      import(
        'src/app/evaluation/quiz/answer/page/quiz-answers-page.component'
      ).then((m) => m.QuizAnswersPageComponent),
  },
  {
    path: AppRoute.quiz.routePath,
    loadComponent: () =>
      import('src/app/evaluation/quiz/page/quiz-page.component').then(
        (m) => m.QuizPageComponent,
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluationRoutingModule {}
