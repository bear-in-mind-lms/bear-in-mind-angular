import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableUserGroupsPageComponent } from './available-user-groups-page.component';

describe('AvailableUserGroupsPageComponent', () => {
  let component: AvailableUserGroupsPageComponent;
  let fixture: ComponentFixture<AvailableUserGroupsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableUserGroupsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailableUserGroupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
