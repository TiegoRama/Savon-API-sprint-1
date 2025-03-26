import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteCreateComponent } from './recette-create.component';

describe('RecetteCreateComponent', () => {
  let component: RecetteCreateComponent;
  let fixture: ComponentFixture<RecetteCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecetteCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecetteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
