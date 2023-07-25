import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationsFormFieldComponent } from './translations-form-field.component';

describe('TranslationsFormFieldComponent', () => {
  let component: TranslationsFormFieldComponent;
  let fixture: ComponentFixture<TranslationsFormFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslationsFormFieldComponent],
    });
    fixture = TestBed.createComponent(TranslationsFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
