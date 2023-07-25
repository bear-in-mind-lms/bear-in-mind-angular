import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonPageComponent } from './course-lesson-page.component';

describe('CourseLessonPageComponent', () => {
  let component: CourseLessonPageComponent;
  let fixture: ComponentFixture<CourseLessonPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CourseLessonPageComponent],
    });
    fixture = TestBed.createComponent(CourseLessonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
