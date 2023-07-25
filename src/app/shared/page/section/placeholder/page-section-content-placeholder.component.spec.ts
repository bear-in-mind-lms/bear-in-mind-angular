import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSectionContentPlaceholderComponent } from './page-section-content-placeholder.component';

describe('PageSectionContentPlaceholderComponent', () => {
  let component: PageSectionContentPlaceholderComponent;
  let fixture: ComponentFixture<PageSectionContentPlaceholderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PageSectionContentPlaceholderComponent],
    });
    fixture = TestBed.createComponent(PageSectionContentPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
