import { TestBed } from '@angular/core/testing';

import { ChecklistOptionsService } from './checklist-options.service';

describe('ChecklistOptionsService', () => {
  let service: ChecklistOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChecklistOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
