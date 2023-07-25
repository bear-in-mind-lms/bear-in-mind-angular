import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConductedCoursesPageComponent } from './conducted-courses-page.component';

describe('ConductedCoursesPageComponent', () => {
  let component: ConductedCoursesPageComponent;
  let fixture: ComponentFixture<ConductedCoursesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConductedCoursesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConductedCoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
