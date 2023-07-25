import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCoursesPageComponent } from './available-courses-page.component';

describe('AvailableCoursesPageComponent', () => {
  let component: AvailableCoursesPageComponent;
  let fixture: ComponentFixture<AvailableCoursesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableCoursesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailableCoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
