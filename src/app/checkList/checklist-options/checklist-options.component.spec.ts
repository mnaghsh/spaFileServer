import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistOptionsComponent } from './checklist-options.component';

describe('ChecklistOptionsComponent', () => {
  let component: ChecklistOptionsComponent;
  let fixture: ComponentFixture<ChecklistOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
