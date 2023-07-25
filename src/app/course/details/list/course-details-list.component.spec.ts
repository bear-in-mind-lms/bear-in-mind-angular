import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsListComponent } from './course-details-list.component';

describe('CourseDetailsListComponent', () => {
  let component: CourseDetailsListComponent;
  let fixture: ComponentFixture<CourseDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
