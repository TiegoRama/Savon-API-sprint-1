import { Component, OnInit } from '@angular/core';


import { Ingredient } from '../../models/Ingredient';
import { DEFAULT_INGREDIENT } from '../../shared/constants/ingredient.constants';
import { IngredientService } from '../../services/ingredients.service';
@Component({
  selector: 'app-ingredient-management-page', 
  templateUrl: './ingredient-management-page.component.html',
  styleUrls: ['./ingredient-management-page.component.css'] 
})
export class IngredientManagerPageComponent implements OnInit {
 // Attributs du composant :
 // ------------------------
 ingredients: Ingredient[] = [];
 // message: string = '';
 isEditing: boolean = false; // Permet de savoir si on est en mode édition
 //ingredientToEditId: number | null = null;

 // Objet Ingredient de travail :
 // -----------------------------
 selectedIngredient: Ingredient = { ...DEFAULT_INGREDIENT };
 // Constructeur avec injection du service :
 // ----------------------------------------
 constructor(private ingredientService: IngredientService) {}
 // Fetch avec le service à l'initialisation :
 // ------------------------------------------
 ngOnInit(): void {
 this.fetchIngredients();
 }
  // _________________________________________________
 //
 // METHODES SUR LES FORMULAIRES
 // _________________________________________________
 /**
 * Récupère tous les ingrédients via l'API.
 */
 fetchIngredients(): void {
  this.ingredientService.getAllIngredients().subscribe({
  next: (data) => this.ingredients = data,
  error: (error) => console.error('Erreur chargement des ingrédients:',error)
  });
  }
  /**
  * Gère la mise à jour de la liste des ingrédients après un import CSV.
  */
  handleImportComplete(): void {
  this.fetchIngredients(); // Recharge la liste après l'importation
  }
 
  /**
  * Ajoute ou met à jour un ingrédient.
  * @param ingredient - L'ingrédient à ajouter ou mettre à jour.
  */
  saveIngredient(ingredient: Ingredient): void {
  if (this.isEditing && ingredient.id !== null) {
  // Mode modification
  this.ingredientService.updateIngredient(ingredient.id,
 ingredient).subscribe({
  next: () => {
  //this.message = 'Ingrédient mis à jour avec succès !';
  this.isEditing = false;
  this.selectedIngredient = { ...DEFAULT_INGREDIENT };
  this.fetchIngredients(); // Recharge la liste
  //this.resetForm();
  },
  error: (error) => {
  console.error('Erreur mise à jour ingrédient:', error);
  //this.message = 'Erreur lors de la mise à jour de l’ingrédient.';
  }
  });
  } else {
  // Mode ajout
  this.ingredientService.addIngredient(ingredient).subscribe({
  next: (newIngredient) => {
  this.ingredients.push(newIngredient);
  this.selectedIngredient = { ...DEFAULT_INGREDIENT };
  this.isEditing = false;
  //this.message = 'Ingrédient ajouté avec succès !';
 //this.resetForm();
 },
 error: (error) => {
 console.error('Erreur ajout ingrédient:', error);
 //this.message = 'Erreur lors de l’ajout de l’ingrédient.';
 }
 });
 }
 }
 /**
 * Prépare la modification d'un ingrédient en remplissant le formulaire avec
ses données.
 * @param ingredient L'ingrédient à modifier.
 */
 editIngredient(ingredient: Ingredient): void {
 this.selectedIngredient = { ...ingredient }; // Clone l'objet pour éviter les modifications directes
 //this.ingredientToEditId = ingredient.id;
 this.isEditing = true;
 }
 /**
 * Supprime un ingrédient via l'API.
 * @param id - Identifiant de l'ingrédient à supprimer.
 */
 deleteIngredient(id: number | null): void {
 if (id === null) return;
 //if (!confirm("Voulez-vous vraiment supprimer cet ingrédient ?")) return;
 this.ingredientService.deleteIngredient(id).subscribe({
 next: () => {
 this.ingredients = this.ingredients.filter(ing => ing.id !== id);
 //this.message = 'Ingrédient supprimé avec succès.';
 },
 error: (error) => {
 console.error('Erreur suppression ingrédient:', error);
 //this.message = 'Erreur lors de la suppression de l’ingrédient.';
 }
 });
 }
 /**
 * Supprime TOUS les ingrédients via l'API
 */
 deleteAllIngredients(): void {
 this.ingredientService.deleteAllIngredients().subscribe({next: () => {
 this.ingredients = []; // Vider la liste après suppression
 },
 error: (error) => console.error('Erreur suppression de tous les ingrédients:', error)
});
}

/**
* Réinitialise le formulaire après soumission.
*/
resetForm(): void {
this.selectedIngredient = { ...DEFAULT_INGREDIENT };
this.isEditing = false;
}
// _________________________________________________
//
// METHODES POUR L'IMPORT & EXPORT DES INGREDIENTS
// _________________________________________________

/**
* Gestion de l'importation CSV.
*/
importFromCSV(event: any): void {
// Logique d'importation depuis le sous-composant
}
/**
* Gestion de l'exportation CSV.
*/
exportToCSV(): void {
// Logique d'exportation depuis le sous-composant
}
}