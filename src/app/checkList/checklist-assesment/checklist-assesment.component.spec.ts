import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistAssesmentComponent } from './checklist-assesment.component';

describe('ChecklistAssesmentComponent', () => {
  let component: ChecklistAssesmentComponent;
  let fixture: ComponentFixture<ChecklistAssesmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistAssesmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistAssesmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
