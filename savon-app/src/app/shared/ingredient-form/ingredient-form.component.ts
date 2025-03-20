import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../models/Ingredient';
import { DEFAULT_INGREDIENT } from '../constants/ingredient.constants';
@Component({
 selector: 'app-ingredient-form',
 templateUrl: './ingredient-form.component.html',
 styleUrl: './ingredient-form.component.css'
})
export class IngredientFormComponent {
 // Champs de saisie des caractéristiques : sapo; ins; iode; lavant; douceur;dureté; solubilité; séchage; vol. mousse et tenue mousse
 ingredientFields: (keyof Ingredient)[] = [
 'sapo', 'ins','iode', 'lavant', 'douceur', 'durete',
 'solubilite', 'sechage','volMousse', 'tenueMousse',

 ];

 // Récupération des valeurs de la vue et du composant parent :
 // -----------------------------------------------------------
 @Input()
 ingredient: Ingredient = { ...DEFAULT_INGREDIENT };


 @Input()
 isEditing: boolean = false;
 // Envoi de valeurs vers la vue et au composant parent :
 // -----------------------------------------------------
 @Output()
 save = new EventEmitter<Ingredient>();
 @Output()
 cancelEdit = new EventEmitter<void>();
 // Méthodes sur le formulaire :
 // ----------------------------
 saveIngredient(): void {
   
 this.save.emit(this.ingredient);

 }
 cancel(): void {
  this.cancelEdit.emit();
  }

  test(){
    alert("test")
  }
 }
