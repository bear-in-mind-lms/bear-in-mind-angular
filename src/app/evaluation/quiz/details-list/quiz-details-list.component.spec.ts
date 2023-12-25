import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDetailsListComponent } from './quiz-details-list.component';

describe('QuizDetailsListComponent', () => {
  let component: QuizDetailsListComponent;
  let fixture: ComponentFixture<QuizDetailsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuizDetailsListComponent]
    });
    fixture = TestBed.createComponent(QuizDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
