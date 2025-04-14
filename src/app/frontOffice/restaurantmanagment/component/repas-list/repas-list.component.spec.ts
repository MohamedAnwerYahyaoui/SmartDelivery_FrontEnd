import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepasListComponent } from './repas-list.component';

describe('RepasListComponent', () => {
  let component: RepasListComponent;
  let fixture: ComponentFixture<RepasListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepasListComponent]
    });
    fixture = TestBed.createComponent(RepasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
