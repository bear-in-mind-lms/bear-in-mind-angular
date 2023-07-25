import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreatorPageComponent } from './course-creator-page.component';

describe('CourseCreatorPageComponent', () => {
  let component: CourseCreatorPageComponent;
  let fixture: ComponentFixture<CourseCreatorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CourseCreatorPageComponent],
    });
    fixture = TestBed.createComponent(CourseCreatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
