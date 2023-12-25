import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSolvingPageComponent } from './quiz-solving-page.component';

describe('QuizSolvingPageComponent', () => {
  let component: QuizSolvingPageComponent;
  let fixture: ComponentFixture<QuizSolvingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuizSolvingPageComponent],
    });
    fixture = TestBed.createComponent(QuizSolvingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
