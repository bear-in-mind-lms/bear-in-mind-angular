import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagePickerDialog } from './language-picker-dialog.component';

describe('LanguagePickerDialog', () => {
  let component: LanguagePickerDialog;
  let fixture: ComponentFixture<LanguagePickerDialog>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LanguagePickerDialog],
    });
    fixture = TestBed.createComponent(LanguagePickerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
