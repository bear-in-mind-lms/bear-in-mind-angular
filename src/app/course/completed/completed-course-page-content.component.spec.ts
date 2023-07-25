import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedCoursePageContentComponent } from './completed-course-page-content.component';

describe('CompletedCoursePageContentComponent', () => {
  let component: CompletedCoursePageContentComponent;
  let fixture: ComponentFixture<CompletedCoursePageContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedCoursePageContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedCoursePageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
