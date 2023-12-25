import { DatePipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { getQuizStatusDisplayInfo } from '../quiz-status-display-info';
import { QuizViewDto } from '../quiz-view-dto';

@Component({
  selector: 'app-quiz-details-list',
  standalone: true,
  imports: [NgIf, DatePipe, MatListModule, MatIconModule],
  templateUrl: './quiz-details-list.component.html',
})
export class QuizDetailsListComponent implements OnInit {
  protected statusIcon!: string;
  protected status!: string;

  @Input({ required: true }) quiz!: QuizViewDto;

  ngOnInit() {
    ({ icon: this.statusIcon, name: this.status } = getQuizStatusDisplayInfo(
      this.quiz.status,
    ));
  }
}
