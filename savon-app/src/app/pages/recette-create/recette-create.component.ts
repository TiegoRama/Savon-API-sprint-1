import { Component, OnInit } from '@angular/core';
import { RecetteDTO } from '../../models/RecetteDTO';
import { LigneIngredient } from '../../models/LigneIngredient';
import { Ingredient } from '../../models/Ingredient';
import { IngredientService } from '../../services/ingredients.service';
import { RecetteService } from '../../services/recette.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recette-create',
  templateUrl: './recette-create.component.html',
  styleUrls: ['./recette-create.component.css']
})
export class RecetteCreateComponent implements OnInit {
  // Attributs du composant
  recetteDTO: RecetteDTO = new RecetteDTO();
  ingredientIdSelect: number | null = null;
  listeIngredients: Ingredient[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';
  
  // Pour le modal
  showModal: boolean = false;
  selectedIngredientQuantity: number = 0;

  constructor(
    private ingredientService: IngredientService,
    private recetteService: RecetteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchIngredients();
  }

  /**
   * Charge la liste des ingrédients disponibles depuis l'API
   */
  fetchIngredients(): void {
    this.isLoading = true;
    this.ingredientService.getAllIngredients().subscribe({
      next: (data) => {
        this.listeIngredients = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des ingrédients.';
        console.error('Erreur API:', error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Ouvre le modal pour ajouter un ingrédient
   */
  openModal(): void {
    this.showModal = true;
    this.ingredientIdSelect = null;
    this.selectedIngredientQuantity = 0;
  }

  /**
   * Ferme le modal
   */
  closeModal(): void {
    this.showModal = false;
  }

  /**
   * Ajoute un nouvel ingrédient à la recette
   */
  ajoutLigne(): void {
    if (!this.ingredientIdSelect) {
      this.errorMessage = 'Veuillez sélectionner un ingrédient.';
      return;
    }

    if (this.selectedIngredientQuantity <= 0) {
      this.errorMessage = 'La quantité doit être supérieure à 0.';
      return;
    }

    // Vérifier si l'ingrédient existe déjà dans la recette
    const existingIndex = this.recetteDTO.ligneIngredients.findIndex(
      ligne => ligne.ingredient?.id === this.ingredientIdSelect
    );

    if (existingIndex !== -1) {
      this.errorMessage = 'Cet ingrédient est déjà dans la recette. Veuillez utiliser un autre ingrédient.';
      return;
    }

    // Récupérer l'ingrédient sélectionné
    const selectedIngredient = this.listeIngredients.find(
      ing => ing.id === this.ingredientIdSelect
    );

    if (selectedIngredient) {
      // Créer une nouvelle ligne d'ingrédient
      const newLigne = new LigneIngredient();
      newLigne.ingredient = selectedIngredient;
      newLigne.quantite = this.selectedIngredientQuantity;
      
      // Ajouter la ligne à la recette
      this.recetteDTO.ligneIngredients.push(newLigne);
      
      // Mettre à jour les pourcentages
      this.majPourcentages();
      
      // Réinitialiser les champs et fermer le modal
      this.ingredientIdSelect = null;
      this.selectedIngredientQuantity = 0;
      this.showModal = false;
      this.errorMessage = '';
    }
  }

  /**
   * Met à jour les pourcentages des ingrédients en fonction des quantités
   */
  majPourcentages(): void {
    // Calculer la quantité totale
    const quantiteTotal = this.recetteDTO.ligneIngredients.reduce(
      (sum, ligne) => sum + ligne.quantite, 0
    );
    
    // Mettre à jour les pourcentages
    if (quantiteTotal > 0) {
      this.recetteDTO.ligneIngredients.forEach(ligne => {
        ligne.pourcentage = (ligne.quantite / quantiteTotal) * 100;
      });
    }
  }
  
  /**
   * Met à jour la quantité d'un ingrédient et recalcule les pourcentages
   */
  updateQuantity(index: number, event: any): void {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0) {
      this.recetteDTO.ligneIngredients[index].quantite = value;
      this.majPourcentages();
    }
  }

  /**
   * Supprime une ligne d'ingrédient de la recette
   */
  supprimerLigne(index: number): void {
    this.recetteDTO.ligneIngredients.splice(index, 1);
    this.majPourcentages();
  }

  /**
   * Soumet la recette à l'API
   */
  submitRecette(): void {
    // Vérifier si le formulaire est valide
    if (!this.validateForm()) {
      return;
    }

    this.recetteService.addRecette(this.recetteDTO).subscribe({
      next: (recette) => {
        this.successMessage = 'Recette créée avec succès!';
        setTimeout(() => {
          this.router.navigate(['/recettes']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la création de la recette: ' + error.message;
        console.error('Erreur API:', error);
      }
    });
  }

  /**
   * Valide le formulaire avant soumission
   */
  validateForm(): boolean {
    this.errorMessage = '';
    
    // Vérifier le titre
    if (!this.recetteDTO.titre.trim()) {
      this.errorMessage = 'Le titre de la recette est obligatoire.';
      return false;
    }
    
    // Vérifier les ingrédients
    if (this.recetteDTO.ligneIngredients.length === 0) {
      this.errorMessage = 'Veuillez ajouter au moins un ingrédient à la recette.';
      return false;
    }
    
    // Vérifier la concentration d'alcalin
    if (this.recetteDTO.concentrationAlcalin <= 0 || this.recetteDTO.concentrationAlcalin > 100) {
      this.errorMessage = 'La concentration d\'alcalin doit être comprise entre 1 et 100%.';
      return false;
    }
    
    // Vérifier le surgraissage
    if (this.recetteDTO.surgraissage < 0 || this.recetteDTO.surgraissage > 20) {
      this.errorMessage = 'Le surgraissage doit être compris entre 0 et 20%.';
      return false;
    }
    
    return true;}
  }