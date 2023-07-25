import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCoursesPageComponent } from './active-courses-page.component';

describe('ActiveCoursesPageComponent', () => {
  let component: ActiveCoursesPageComponent;
  let fixture: ComponentFixture<ActiveCoursesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveCoursesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveCoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
