import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendSpechializedErgonomiToAssessorComponent } from './send-spechialized-ergonomi-to-assessor.component';

describe('SendSpechializedErgonomiToAssessorComponent', () => {
  let component: SendSpechializedErgonomiToAssessorComponent;
  let fixture: ComponentFixture<SendSpechializedErgonomiToAssessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendSpechializedErgonomiToAssessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendSpechializedErgonomiToAssessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
