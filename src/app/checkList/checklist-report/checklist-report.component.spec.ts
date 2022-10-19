import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistReportComponent } from './checklist-report.component';

describe('ChecklistReportComponent', () => {
  let component: ChecklistReportComponent;
  let fixture: ComponentFixture<ChecklistReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
