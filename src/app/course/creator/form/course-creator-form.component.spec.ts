import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreatorFormComponent } from './course-creator-form.component';

describe('CourseCreatorFormComponent', () => {
  let component: CourseCreatorFormComponent;
  let fixture: ComponentFixture<CourseCreatorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CourseCreatorFormComponent],
    });
    fixture = TestBed.createComponent(CourseCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
