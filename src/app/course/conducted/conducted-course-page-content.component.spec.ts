import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductedCoursePageContentComponent } from './conducted-course-page-content.component';

describe('ConductedCoursePageContentComponent', () => {
  let component: ConductedCoursePageContentComponent;
  let fixture: ComponentFixture<ConductedCoursePageContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConductedCoursePageContentComponent],
    });
    fixture = TestBed.createComponent(ConductedCoursePageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
