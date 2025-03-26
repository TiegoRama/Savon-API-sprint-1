import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/Ingredient';
import { IngredientService } from '../../services/ingredients.service';
import { LigneIngredient } from '../../models/LigneIngredient';
import { RecetteDTO } from '../../models/RecetteDTO';
import { RecetteService } from '../../services/recette.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recette-create',
  templateUrl: './recette-create.component.html',
  styleUrl: './recette-create.component.css'
})
export class RecetteCreateComponent implements OnInit {
  availableIngredients: Ingredient[] = []; // à alimenter via service
  selectedIngredients: LigneIngredient[] = []; // Liste des ingrédients sélectionnés
  recetteDTO: RecetteDTO = new RecetteDTO();
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  
  // État du modal
  showIngredientModal: boolean = false;
  
  constructor(
    private ingredientService: IngredientService,
    private recetteService: RecetteService,
    private router: Router
  ) {}

  /**
   * Appel du service de récupération des ingrédients à l'initialisation
   */
  ngOnInit(): void {
    this.loadIngredients();
    // Initialiser les valeurs par défaut
    this.recetteDTO.avecSoude = true;
    this.recetteDTO.concentrationAlcalin = 30;
    this.recetteDTO.surgraissage = 0;
  }

  /**
   * Charge la liste des ingrédients disponibles depuis le service
   */
  loadIngredients(): void {
    this.isLoading = true;
    this.ingredientService.getAllIngredients().subscribe({
      next: (ingredients) => {
        this.availableIngredients = ingredients;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des ingrédients', err);
        this.errorMessage = 'Erreur lors du chargement des ingrédients';
        this.isLoading = false;
      }
    });
  }

  /**
   * Ouvre le modal de sélection des ingrédients
   */
  openIngredientModal(): void {
    this.showIngredientModal = true;
  }

  /**
   * Ferme le modal de sélection des ingrédients
   */
  closeIngredientModal(): void {
    this.showIngredientModal = false;
  }

  /**
   * Méthode d'ajout d'un ingrédient à la recette
   * @param ingredient Ingrédient à ajouter à la recette
   */
  ajouterIngredient(ingredient: Ingredient): void {
    // Empêcher les doublons
    if (this.selectedIngredients.find(l => l.ingredient?.id === ingredient.id)) {
      return;
    }
    
    const newLigne = new LigneIngredient();
    newLigne.ingredient = ingredient;
    newLigne.quantite = 0;
    newLigne.pourcentage = 0;
    
    this.selectedIngredients.push(newLigne);
    // Ajouter également à recetteDTO.ligneIngredients pour la soumission
    this.recetteDTO.ligneIngredients = this.selectedIngredients;
  }

  /**
   * Supprime un ingrédient préalablement choisi pour la recette en cours
   * @param index Index de l'ingrédient à supprimer
   */
  supprimerIngredient(index: number): void {
    this.selectedIngredients.splice(index, 1);
    // Mettre à jour le DTO
    this.recetteDTO.ligneIngredients = this.selectedIngredients;
  }

  /**
   * Met à jour la quantité d'un ingrédient et recalcule les pourcentages
   */
  updateQuantity(index: number, event: any): void {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0) {
      this.selectedIngredients[index].quantite = value;
      // Dans la partie 2, ceci devra appeler la méthode updatePercentages
    }
  }

  /**
   * Met à jour les pourcentages en fonction des quantités
   * (À implémenter dans la partie 2)
   */
  updatePercentages(): void {
    // Sera implémenté dans la partie 2
    const quantiteTotal = this.selectedIngredients.reduce(
      (sum, ligne) => sum + ligne.quantite, 0
    );
    
    if (quantiteTotal > 0) {
      this.selectedIngredients.forEach(ligne => {
        ligne.pourcentage = (ligne.quantite / quantiteTotal) * 100;
      });
    }
  }

  /**
   * Envoie la recette à l'API
   */
  submitRecette(): void {
    if (this.validateForm()) {
      this.isLoading = true;
      
      this.recetteService.addRecette(this.recetteDTO).subscribe({
        next: (response) => {
          console.log('Recette créée avec succès', response);
          this.isLoading = false;
          this.successMessage = 'Recette créée avec succès!';
          // Redirection vers la liste des recettes après 1.5 secondes
          setTimeout(() => {
            this.router.navigate(['/recettes']);
          }, 1500);
        },
        error: (error) => {
          console.error('Erreur lors de la création de la recette', error);
          this.errorMessage = 'Erreur lors de la création de la recette';
          this.isLoading = false;
        }
      });
    }
  }

  /**
   * Valide le formulaire avant soumission
   */
  validateForm(): boolean {
    this.errorMessage = '';
    
    // Vérifier que les données minimales sont présentes
    if (!this.recetteDTO.titre) {
      this.errorMessage = 'Le titre est obligatoire';
      return false;
    }
    
    if (this.selectedIngredients.length === 0) {
      this.errorMessage = 'Ajoutez au moins un ingrédient';
      return false;
    }
    
    // Vérifier que chaque ingrédient a une quantité
    for (const ligne of this.selectedIngredients) {
      if (ligne.quantite <= 0) {
        this.errorMessage = 'Chaque ingrédient doit avoir une quantité';
        return false;
      }
    }
    
    return true;
  }
}