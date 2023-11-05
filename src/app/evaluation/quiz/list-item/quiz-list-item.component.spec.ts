import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListItemComponent } from './quiz-list-item.component';

describe('QuizListItemComponent', () => {
  let component: QuizListItemComponent;
  let fixture: ComponentFixture<QuizListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuizListItemComponent],
    });
    fixture = TestBed.createComponent(QuizListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
