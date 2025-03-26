import { Component, Input, Output, EventEmitter, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Ingredient } from '../../models/Ingredient';
//import { Modal } from 'bootstrap';

@Component({
 selector: 'app-ingredient-list',
 templateUrl: './ingredient-list.component.html',
 styleUrl: './ingredient-list.component.css'
})
export class IngredientListComponent implements AfterViewInit {
 @Input() ingredients: Ingredient[] = [];
 @Output() edit = new EventEmitter<Ingredient>();
 @Output() delete = new EventEmitter<number>();
 @Output() deleteAll = new EventEmitter<void>();
 
 ingredientToDelete: Ingredient | null = null;
 //deleteModal!: Modal;
 //deleteAllModal!: Modal;
 
 constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
 
 ngAfterViewInit(): void {
   // Exécuter ce code uniquement côté navigateur
   if (isPlatformBrowser(this.platformId)) {
     const modalElement = document.getElementById('deleteModal');
     if (modalElement) {
       //this.deleteModal = new Modal(modalElement);
     }
     const modalElementAll = document.getElementById('deleteAllModal');
     if (modalElementAll) {
       //this.deleteAllModal = new Modal(modalElementAll);
     }
   }
 }
 
 // Reste du code sans changement...
 
 confirmDelete(ingredient: Ingredient): void {
   this.ingredientToDelete = ingredient;
   //this.deleteModal.show();
 }
 
 deleteConfirmed(): void {
   if (this.ingredientToDelete) {
     this.delete.emit(this.ingredientToDelete.id!);
     this.ingredientToDelete = null;
     //this.deleteModal.hide();
   }
 }
 
 confirmDeleteAll(): void {
   //this.deleteAllModal.show();
 }
 
 deleteAllConfirmed(): void {
   this.deleteAll.emit();
   //this.deleteAllModal.hide();
 }
 
 editIngredient(ingredient: Ingredient): void {
   this.edit.emit(ingredient);
 }
}