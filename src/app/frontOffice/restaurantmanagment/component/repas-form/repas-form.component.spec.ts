import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepasFormComponent } from './repas-form.component';

describe('RepasFormComponent', () => {
  let component: RepasFormComponent;
  let fixture: ComponentFixture<RepasFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepasFormComponent]
    });
    fixture = TestBed.createComponent(RepasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
