import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientComponent } from './ingredients.component';

describe('IngredientComponent', () => {
  let component: IngredientComponent;
  let fixture: ComponentFixture<IngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
