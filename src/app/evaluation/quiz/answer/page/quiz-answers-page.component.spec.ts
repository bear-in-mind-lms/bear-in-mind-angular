import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAnswersPageComponent } from './quiz-answers-page.component';

describe('QuizAnswersPageComponent', () => {
  let component: QuizAnswersPageComponent;
  let fixture: ComponentFixture<QuizAnswersPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuizAnswersPageComponent],
    });
    fixture = TestBed.createComponent(QuizAnswersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
