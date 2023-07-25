import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListPageSectionContentComponent } from './card-list-page-section-content.component';

describe('CardListPageSectionContentComponent', () => {
  let component: CardListPageSectionContentComponent;
  let fixture: ComponentFixture<CardListPageSectionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardListPageSectionContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardListPageSectionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
