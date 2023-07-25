import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupCreatorPageComponent } from './user-group-creator-page.component';

describe('UserGroupCreatorPageComponent', () => {
  let component: UserGroupCreatorPageComponent;
  let fixture: ComponentFixture<UserGroupCreatorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserGroupCreatorPageComponent],
    });
    fixture = TestBed.createComponent(UserGroupCreatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
