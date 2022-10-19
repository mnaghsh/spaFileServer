import { TestBed } from '@angular/core/testing';

import { SendSpechializedErgonomiToAssessorService } from './send-spechialized-ergonomi-to-assessor.service';

describe('SendSpechializedErgonomiToAssessorService', () => {
  let service: SendSpechializedErgonomiToAssessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendSpechializedErgonomiToAssessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
