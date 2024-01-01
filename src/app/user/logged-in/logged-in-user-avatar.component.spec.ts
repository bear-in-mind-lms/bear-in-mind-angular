import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInUserAvatarComponent } from './logged-in-user-avatar.component';

describe('LoggedInUserAvatarComponent', () => {
  let component: LoggedInUserAvatarComponent;
  let fixture: ComponentFixture<LoggedInUserAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoggedInUserAvatarComponent],
    });
    fixture = TestBed.createComponent(LoggedInUserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
