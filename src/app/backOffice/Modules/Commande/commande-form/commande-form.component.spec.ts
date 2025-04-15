import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeFormComponent } from './commande-form.component';

describe('CommandeFormComponent', () => {
  let component: CommandeFormComponent;
  let fixture: ComponentFixture<CommandeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandeFormComponent]
    });
    fixture = TestBed.createComponent(CommandeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
