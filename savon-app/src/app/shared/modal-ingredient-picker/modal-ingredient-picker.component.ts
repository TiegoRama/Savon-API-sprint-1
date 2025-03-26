// modal-ingredient-picker.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../models/Ingredient';

@Component({
  selector: 'app-modal-ingredient-picker',
  templateUrl: './modal-ingredient-picker.component.html',
  styleUrl: './modal-ingredient-picker.component.css'
})
export class ModalIngredientPickerComponent {
  
  @Input()
  ingredients: Ingredient[] = []; // Liste ingrédients disponibles via le service 
  
  @Input()
  visible: boolean = false;
  
  @Output() 
  close = new EventEmitter<void>();
  
  @Output()
  selectIngredient = new EventEmitter<Ingredient>();
  
  selectedIngredient?: Ingredient; // Ingrédient choisi par l'utilisateur
  
  constructor() {}
  
  // Méthodes du Modal :
  // -------------------
  /**
   * Ajout de l'ingrédient
   */
  onAdd(): void {
    if (this.selectedIngredient) {
      this.selectIngredient.emit(this.selectedIngredient);
      this.closeModal();
    }
  }
  
  /**
   * Fermeture du modal 
   */
  closeModal(): void {
    this.selectedIngredient = undefined;
    this.close.emit();
  }
}