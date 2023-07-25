import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBottomNavigationComponent } from './main-bottom-navigation.component';

describe('MainBottomNavigationComponent', () => {
  let component: MainBottomNavigationComponent;
  let fixture: ComponentFixture<MainBottomNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainBottomNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainBottomNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
