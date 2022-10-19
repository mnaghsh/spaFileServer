import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodInspectionComponent } from './food-inspection.component';

describe('FoodInspectionComponent', () => {
  let component: FoodInspectionComponent;
  let fixture: ComponentFixture<FoodInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
