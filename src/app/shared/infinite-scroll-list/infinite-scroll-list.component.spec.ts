import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollListComponent } from './infinite-scroll-list.component';

describe('InfiniteScrollListComponent', () => {
  let component: InfiniteScrollListComponent;
  let fixture: ComponentFixture<InfiniteScrollListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteScrollListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfiniteScrollListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
