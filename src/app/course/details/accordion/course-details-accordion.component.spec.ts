import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsAccordionComponent } from './course-details-accordion.component';

describe('CourseDetailsAccordionComponent', () => {
  let component: CourseDetailsAccordionComponent;
  let fixture: ComponentFixture<CourseDetailsAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailsAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetailsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
