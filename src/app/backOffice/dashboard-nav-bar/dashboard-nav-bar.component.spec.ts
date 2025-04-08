import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNavBarComponent } from './dashboard-nav-bar.component';

describe('DashboardNavBarComponent', () => {
  let component: DashboardNavBarComponent;
  let fixture: ComponentFixture<DashboardNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardNavBarComponent]
    });
    fixture = TestBed.createComponent(DashboardNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
