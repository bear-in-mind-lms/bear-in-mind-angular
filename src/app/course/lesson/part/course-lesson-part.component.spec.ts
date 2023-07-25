import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLessonPartComponent } from './course-lesson-part.component';

describe('CourseLessonPartComponent', () => {
  let component: CourseLessonPartComponent;
  let fixture: ComponentFixture<CourseLessonPartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CourseLessonPartComponent],
    });
    fixture = TestBed.createComponent(CourseLessonPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
