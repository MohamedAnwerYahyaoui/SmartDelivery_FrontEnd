import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomNewUserComponent } from './welcom-new-user.component';

describe('WelcomNewUserComponent', () => {
  let component: WelcomNewUserComponent;
  let fixture: ComponentFixture<WelcomNewUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomNewUserComponent]
    });
    fixture = TestBed.createComponent(WelcomNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
