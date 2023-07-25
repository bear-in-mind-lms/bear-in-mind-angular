import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsPageComponent } from './user-groups-page.component';

describe('UserGroupsPageComponent', () => {
  let component: UserGroupsPageComponent;
  let fixture: ComponentFixture<UserGroupsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserGroupsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserGroupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
