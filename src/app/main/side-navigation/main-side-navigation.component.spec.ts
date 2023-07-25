import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSideNavigationComponent } from './main-side-navigation.component';

describe('MainSideNavigationComponent', () => {
  let component: MainSideNavigationComponent;
  let fixture: ComponentFixture<MainSideNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MainSideNavigationComponent],
    });
    fixture = TestBed.createComponent(MainSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
