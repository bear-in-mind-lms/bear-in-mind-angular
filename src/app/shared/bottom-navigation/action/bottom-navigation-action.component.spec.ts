import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavigationActionComponent } from './bottom-navigation-action.component';

describe('BottomNavigationActionComponent', () => {
  let component: BottomNavigationActionComponent;
  let fixture: ComponentFixture<BottomNavigationActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomNavigationActionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNavigationActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
