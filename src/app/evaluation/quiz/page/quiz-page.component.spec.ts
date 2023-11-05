import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPageComponent } from './quiz-page.component';

describe('QuizPageComponent', () => {
  let component: QuizPageComponent;
  let fixture: ComponentFixture<QuizPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuizPageComponent],
    });
    fixture = TestBed.createComponent(QuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
