import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupCreatorFormComponent } from './user-group-creator-form.component';

describe('UserGroupCreatorFormComponent', () => {
  let component: UserGroupCreatorFormComponent;
  let fixture: ComponentFixture<UserGroupCreatorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserGroupCreatorFormComponent],
    });
    fixture = TestBed.createComponent(UserGroupCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
