import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCoursePageContentComponent } from './active-course-page-content.component';

describe('ActiveCoursePageContentComponent', () => {
  let component: ActiveCoursePageContentComponent;
  let fixture: ComponentFixture<ActiveCoursePageContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveCoursePageContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveCoursePageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
