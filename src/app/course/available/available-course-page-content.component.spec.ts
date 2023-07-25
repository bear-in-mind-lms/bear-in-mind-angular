import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCoursePageContentComponent } from './available-course-page-content.component';

describe('AvailableCoursePageContentComponent', () => {
  let component: AvailableCoursePageContentComponent;
  let fixture: ComponentFixture<AvailableCoursePageContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableCoursePageContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailableCoursePageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
