import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterIngredientComponent } from './ingredient-create.component';

describe('IngredientCreateComponent', () => {
  let component: AjouterIngredientComponent;
  let fixture: ComponentFixture<AjouterIngredientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouterIngredientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouterIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
