import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../models/Ingredient';
//import { Modal } from 'bootstrap';


@Component({
 selector: 'app-ingredient-list',
 templateUrl: './ingredient-list.component.html',
 styleUrl: './ingredient-list.component.css'
})
export class IngredientListComponent {
 // Récupération des valeurs de la vue et du composant parent :
 // -----------------------------------------------------------
 @Input()
 ingredients: Ingredient[] = [];
 // Envoi de valeurs vers la vue et au composant parent :
 // -----------------------------------------------------
 @Output()
 edit = new EventEmitter<Ingredient>();
 @Output()
 delete = new EventEmitter<number>();
 @Output()
 deleteAll = new EventEmitter<void>(); // Événement pour supprimer TOUS les ingrédients
 // Gestion de la suppression d'un ingrédient avec un modal :
 // ---------------------------------------------------------
 ingredientToDelete: Ingredient | null = null;
 //deleteModal!: Modal;
 //deleteAllModal!: Modal;
 /**
 * Initialise les modales Bootstrap après chargement du composant.
 */
 ngAfterViewInit(): void {
 const modalElement = document.getElementById('deleteModal');
 if (modalElement) {
 //this.deleteModal = new Modal(modalElement);
 }
 const modalElementAll = document.getElementById('deleteAllModal');
 if (modalElementAll) {
 //this.deleteAllModal = new Modal(modalElementAll);
 }
 }
 /**
 * Affiche la modale de confirmation avant suppression.
 * @param ingredient L'ingrédient à supprimer.
 */
 confirmDelete(ingredient: Ingredient): void {
 this.ingredientToDelete = ingredient;
 //this.deleteModal.show();
 }
 /**
 * Supprime l’ingrédient après confirmation.
 */
 deleteConfirmed(): void {
 if (this.ingredientToDelete) {
 this.delete.emit(this.ingredientToDelete.id!);
 this.ingredientToDelete = null;
 //this.deleteModal.hide();
}
}
/**
* Affiche la modale de confirmation pour supprimer TOUS les ingrédients.
*/
confirmDeleteAll(): void {
//this.deleteAllModal.show();
}
/**
* Supprime TOUS les ingrédients après confirmation.
*/
deleteAllConfirmed(): void {
this.deleteAll.emit();
//this.deleteAllModal.hide();
}
/**
* Émet un événement pour éditer un ingrédient.
* @param ingredient L'ingrédient sélectionné.
*/
editIngredient(ingredient: Ingredient): void {
this.edit.emit(ingredient);
}

}