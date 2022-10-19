import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesOfFoodComponent } from './types-of-food.component';

describe('TypesOfFoodComponent', () => {
  let component: TypesOfFoodComponent;
  let fixture: ComponentFixture<TypesOfFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesOfFoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesOfFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
