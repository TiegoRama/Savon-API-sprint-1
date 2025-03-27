import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../models/Ingredient';
import { IngredientService } from '../../services/ingredients.service';
import { LigneIngredient } from '../../models/LigneIngredient';
import { RecetteDTO } from '../../models/RecetteDTO';
import { RecetteService } from '../../services/recette.service';

@Component({
  selector: 'app-recette-create',
  templateUrl: './recette-create.component.html',
  styleUrl: './recette-create.component.css'
})
export class RecettesCreateComponent implements OnInit {
  // Propriétés de la recette
 recetteDTO=new RecetteDTO()

  // Propriétés pour la gestion des ingrédients
  ingredientIdSelect: number | null = null;
  listeIngredients: Ingredient[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private recetteService: RecetteService,
    private simulateurService: IngredientService
  ) {}

  ngOnInit(): void {
    this.fetchIngredients(); // Charger les ingrédients disponibles
  }

  /**
   * Charge la liste des ingrédients disponibles depuis l'API.
   */
  fetchIngredients(): void {
    this.isLoading = true;
    this.simulateurService.getAllIngredients().subscribe({
      next: (data) => {
        this.listeIngredients = data;
        this.isLoading = false;
      },
      error: (error:Error) => {
        this.errorMessage = 'Erreur lors du chargement des ingrédients.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Ajoute un nouvel ingrédient à la recette.
   */
  ajoutLigne(): void {
    console.log("Début de ajoutLigne");
    if (this.ingredientIdSelect) {
      console.log("Ingrédient sélectionné :", this.ingredientIdSelect);
      const ingredient = this.listeIngredients.find((i) => i.id == this.ingredientIdSelect);
      if (ingredient) {
        console.log("Ingrédient trouvé :", ingredient);
        const nouvelleLigne = new LigneIngredient();
        nouvelleLigne.ingredient = ingredient;
        nouvelleLigne.ingredientId = ingredient.id;
        nouvelleLigne.quantite = 0;
        nouvelleLigne.pourcentage = 0;
        this.recetteDTO.ligneIngredients.push(nouvelleLigne);
        console.log("Nouvelle ligne ajoutée :", nouvelleLigne);
        this.ingredientIdSelect = null;
        this.majPourcentages();
        console.log("Pourcentages mis à jour :", this.recetteDTO.ligneIngredients);
      } else {
        console.error("Ingrédient non trouvé dans la liste.");
      }
    } else {
      console.error("Aucun ingrédient sélectionné.");
    }
  }

  /**
   * Met à jour les pourcentages des ingrédients en fonction des quantités.
   */
  majPourcentages(): void {
    const totalQuantite = this.recetteDTO.ligneIngredients.reduce((sum, ligne) => sum + ligne.quantite, 0);
    this.recetteDTO.ligneIngredients.forEach((ligne) => {
      ligne.pourcentage = totalQuantite > 0 ? (ligne.quantite / totalQuantite) * 100 : 0;
    });
  }

  /**
   * Supprime une ligne d'ingrédient de la recette.
   */
  supprimerLigne(index: number): void {
    this.recetteDTO.ligneIngredients.splice(index, 1);
    this.majPourcentages(); // Mettre à jour les pourcentages
  }

  /**
   * Soumet le formulaire pour créer une nouvelle recette.
   */
  onSubmit(): void {
    console.log(this.recetteDTO);
  
    this.recetteService.addRecette(this.recetteDTO).subscribe({
      next: (response) => {
        console.log('Recette enregistrée avec succès:', response);
        alert('Recette enregistrée avec succès !');
      },
      error: (error) => {
        console.error('Erreur lors de l\'enregistrement de la recette:', error);
        alert('Erreur lors de l\'enregistrement de la recette.');
      }
    });
  }

  /**
   * Réinitialise le formulaire après soumission.
   */
  resetForm(): void {
   this.recetteDTO=new RecetteDTO()
  }
}