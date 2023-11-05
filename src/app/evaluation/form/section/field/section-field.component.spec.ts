import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFieldComponent } from './section-field.component';

describe('SectionFieldComponent', () => {
  let component: SectionFieldComponent;
  let fixture: ComponentFixture<SectionFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SectionFieldComponent],
    });
    fixture = TestBed.createComponent(SectionFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
