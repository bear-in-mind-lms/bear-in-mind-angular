import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUserGroupsPageComponent } from './registered-user-groups-page.component';

describe('RegisteredUserGroupsPageComponent', () => {
  let component: RegisteredUserGroupsPageComponent;
  let fixture: ComponentFixture<RegisteredUserGroupsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredUserGroupsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisteredUserGroupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
