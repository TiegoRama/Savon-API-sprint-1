import { Component, OnInit } from '@angular/core';
import { Recette } from '../../models/Recette';
import { RecetteService } from '../../services/recette.service';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrls: ['./recettes.component.css']
})
export class RecettesComponent implements OnInit {
  recettes: Recette[] = []; // Liste des recettes
  isLoading: boolean = true; // Indicateur de chargement
  errorMessage: string = ""; // Message d'erreur

  constructor(private recetteService: RecetteService) {}

  ngOnInit(): void {
    this.fetchRecettes(); // Récupère les recettes au chargement du composant
  }

  /**
   * Récupère la liste des recettes depuis l'API
   */
  fetchRecettes(): void {
    this.recetteService.getAllRecettes().subscribe({
      next: (data:Recette[]) => {
        this.recettes = data;
        this.isLoading = false;
      },
      error: (error:Error) => {
        this.errorMessage = "Erreur lors du chargement des recettes.";
        console.error("Erreur API:", error);
        this.isLoading = false;
      }
    });
  }

  /**
   * Supprime une recette
   * @param id - L'ID de la recette à supprimer
   */
  deleteRecette(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
      this.recetteService.deleteRecette(id).subscribe({
        next: () => {
          console.log("Recette supprimée avec succès.");
          this.fetchRecettes(); // Rafraîchit la liste des recettes après suppression
        },
        error: (error:Error) => {
          console.error("Erreur lors de la suppression de la recette:", error);
        }
      });
    }
  }
}