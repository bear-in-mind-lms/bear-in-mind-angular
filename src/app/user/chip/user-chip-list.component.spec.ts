import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserChipListComponent } from './user-chip-list.component';

describe('UserChipListComponent', () => {
  let component: UserChipListComponent;
  let fixture: ComponentFixture<UserChipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserChipListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
