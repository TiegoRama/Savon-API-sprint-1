import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientManagerPageComponent } from './ingredient-management-page.component';

describe('IngredientManagementPageComponent', () => {
  let component: IngredientManagerPageComponent;
  let fixture: ComponentFixture<IngredientManagerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngredientManagerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientManagerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
