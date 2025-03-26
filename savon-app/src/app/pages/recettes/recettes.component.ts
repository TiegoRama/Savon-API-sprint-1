// recettes.component.ts
import { Component, OnInit } from '@angular/core';
import { Recette } from '../../models/Recette';
import { RecetteService } from '../../services/recette.service';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.component.html',
  styleUrl: './recettes.component.css'
})
export class RecettesComponent implements OnInit {
  recettes: Recette[] = [];
  isLoading: boolean = true;
  errorMessage: string = "";

  constructor(private recetteService: RecetteService) {}

  ngOnInit(): void {
    this.fetchRecettes();
  }

  fetchRecettes(): void {
    this.recetteService.getAllRecettes().subscribe({
      next: (data: Recette[]) => {
        this.recettes = data;
        this.isLoading = false;
      },
      error: (error: Error) => {
        this.errorMessage = "Erreur lors du chargement des recettes.";
        console.error("Erreur API:", error);
        this.isLoading = false;
      }
    });
  }

  // Ajoutez cette méthode pour gérer la suppression
  deleteRecette(id: number | null): void {
    if (id === null) return;
    
    if (confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
      this.recetteService.deleteRecette(id).subscribe({
        next: () => {
          console.log("Recette supprimée avec succès");
          this.fetchRecettes(); // Recharger la liste après suppression
        },
        error: (error: Error) => {
          console.error("Erreur lors de la suppression:", error);
        }
      });
    }
  }
  getScores(recette: Recette): number[] {
    // Si listeResultats n'existe pas ou est vide, retourner des valeurs par défaut
    if (!recette.resultats || recette.resultats.length < 9) {
      return [5, 5, 5, 5, 5, 5, 5]; // Valeurs par défaut
    }
    
    // Sinon, récupérer les scores réels
    return [
      recette.resultats[2]?.score || 0,
      recette.resultats[3]?.score || 0,
      recette.resultats[4]?.score || 0,
      recette.resultats[5]?.score || 0,
      recette.resultats[6]?.score || 0,
      recette.resultats[7]?.score || 0,
      recette.resultats[8]?.score || 0
    ];
  }
}