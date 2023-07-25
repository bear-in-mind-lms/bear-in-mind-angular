import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeFormFieldComponent } from './date-time-form-field.component';

describe('DateTimeFormFieldComponent', () => {
  let component: DateTimeFormFieldComponent;
  let fixture: ComponentFixture<DateTimeFormFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DateTimeFormFieldComponent],
    });
    fixture = TestBed.createComponent(DateTimeFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
