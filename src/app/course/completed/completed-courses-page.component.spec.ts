import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedCoursesPageComponent } from './completed-courses-page.component';

describe('CompletedCoursesPageComponent', () => {
  let component: CompletedCoursesPageComponent;
  let fixture: ComponentFixture<CompletedCoursesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedCoursesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedCoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
