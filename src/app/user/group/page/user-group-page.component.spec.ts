import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupPageComponent } from './user-group-page.component';

describe('UserGroupPageComponent', () => {
  let component: UserGroupPageComponent;
  let fixture: ComponentFixture<UserGroupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGroupPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
