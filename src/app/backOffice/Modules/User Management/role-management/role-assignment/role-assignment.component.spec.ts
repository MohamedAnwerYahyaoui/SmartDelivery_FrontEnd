import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAssignmentComponent } from './role-assignment.component';

describe('RoleAssignmentComponent', () => {
  let component: RoleAssignmentComponent;
  let fixture: ComponentFixture<RoleAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleAssignmentComponent]
    });
    fixture = TestBed.createComponent(RoleAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
