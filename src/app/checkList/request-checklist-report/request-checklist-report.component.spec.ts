import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestChecklistReportComponent } from './request-checklist-report.component';

describe('RequestChecklistReportComponent', () => {
  let component: RequestChecklistReportComponent;
  let fixture: ComponentFixture<RequestChecklistReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestChecklistReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestChecklistReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
