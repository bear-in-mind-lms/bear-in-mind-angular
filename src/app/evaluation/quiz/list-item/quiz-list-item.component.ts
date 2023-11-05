import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { AppRoute, AppRouteParam } from '../../../routing/app-route';
import { injectPathVariables } from '../../../shared/path-utils';
import { QuizListItemDto } from '../quiz-list-item-dto';
import { QuizStatus } from '../quiz-status';
import { getQuizStatusDisplayInfo } from '../quiz-status-display-info';

function getResultDetails(quiz: QuizListItemDto) {
  if (quiz.status === QuizStatus.toDo || quiz.status === QuizStatus.sent) {
    return '';
  }

  const points = $localize`:@@points:`.toLowerCase();
  return ` (${quiz.grade}), ${points}: ${quiz.result} / ${quiz.maxPoints}`;
}

@Component({
  selector: 'app-quiz-list-item',
  standalone: true,
  imports: [NgIf, RouterLink, MatListModule, MatIconModule],
  templateUrl: './quiz-list-item.component.html',
})
export class QuizListItemComponent implements OnInit {
  protected quizRoute?: string;
  protected icon!: string;
  protected iconClass!: string;
  protected status!: string;
  protected result!: string;

  @Input({ required: true }) quiz!: QuizListItemDto;
  @Input({ required: true }) courseLessonId!: number;

  ngOnInit() {
    if (this.quiz.userId === undefined) {
      this.quizRoute = injectPathVariables(AppRoute.quiz.routerLink, {
        [AppRouteParam.id]: this.quiz.id,
      });
    } else if (this.quiz.status !== QuizStatus.toDo) {
      this.quizRoute = injectPathVariables(AppRoute.quizAnswers.routerLink, {
        [AppRouteParam.quizId]: this.quiz.id,
        [AppRouteParam.userId]: this.quiz.userId,
        [AppRouteParam.courseLessonId]: this.courseLessonId,
      });
    }

    ({
      icon: this.icon,
      iconClass: this.iconClass,
      name: this.status,
    } = getQuizStatusDisplayInfo(this.quiz.status));
    this.result = getResultDetails(this.quiz);
  }
}
