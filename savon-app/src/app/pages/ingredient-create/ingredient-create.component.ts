import { Component } from '@angular/core';
import { IngredientService } from '../../services/ingredients.service';
import { Ingredient } from '../../models/Ingredient';

@Component({
  selector: 'app-ingredient-create',
  templateUrl: './ingredient-create.component.html',
  styleUrls: ['./ingredient-create.component.css']
})
export class IngredientCreateComponent {
  ingredient: Ingredient = {
    id: null,
    nom:'',
    iode: 0,
    ins: 0,
    sapo:0,
    volMousse:0,
    tenueMousse:0,
    douceur:0,
    lavant:0,
    durete:0,
    solubilite:0,
    sechage:0,
    estCorpsGras: true,
    ligneIngredients: []

  };

  constructor(private IngredientService: IngredientService) {}

  onSubmit() {
    this.IngredientService.postIngredient(this.ingredient).subscribe({
      next: (response) => {
        console.log('Ingrédient enregistré:', response);
        // Redirection ou réinitialisation du formulaire
        this.ingredient = {
          id: null, 
          nom:'',
          iode: 0,
          ins: 0,
          sapo:0,
          volMousse:0,
          tenueMousse:0,
          douceur:0,
          lavant:0,
          durete:0,
          solubilite:0,
          sechage:0,
          estCorpsGras: true,
          ligneIngredients: []
        };
      },
      error: (err) => console.error('Erreur:', err)
    });
  }
}