import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonCardComponent } from './course-lesson-card.component';

describe('CourseLessonCardComponent', () => {
  let component: CourseLessonCardComponent;
  let fixture: ComponentFixture<CourseLessonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseLessonCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseLessonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
