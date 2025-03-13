import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recette } from '../models/Recette';


@Injectable({
  providedIn: 'root'
})

export class RecetteService {
    private apiUrl = 'http://localhost:8080/api-savon/v1';
  
    constructor(private http: HttpClient) {}
  
    /**
     * Récupère toutes les recettes.
     * @returns Un Observable contenant la liste des recettes.
     */
    getAllRecettes(): Observable<Recette[]> {
      return this.http.get<Recette[]>(`${this.apiUrl}/recette`);
    }
  
    /**
     * Récupère une recette par son ID.
     * @param id - L'identifiant de la recette.
     * @returns Un Observable contenant la recette correspondante.
     */
    getRecetteById(id: number): Observable<Recette> {
      return this.http.get<Recette>(`${this.apiUrl}/recette/${id}`);
    }
  
    /**
     * Enregistre une nouvelle recette.
     * @param recette - L'objet Recette à enregistrer.
     * @returns Un Observable contenant la recette enregistrée.
     */
    addRecette(recette: Recette): Observable<Recette> {
      return this.http.post<Recette>(`${this.apiUrl}/recette`, recette);
    }
  
    /**
     * Met à jour une recette existante par son ID.
     * @param id - L'identifiant de la recette.
     * @param recette - L'objet Recette mis à jour.
     * @returns Un Observable contenant la recette mise à jour.
     */
    updateRecette(id: number, recette: Recette): Observable<Recette> {
      return this.http.put<Recette>(`${this.apiUrl}/recette/${id}`, recette);
    }
  
    /**
     * Supprime une recette par son ID.
     * @param id - L'identifiant de la recette.
     * @returns Un Observable vide.
     */
    deleteRecette(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/recette/${id}`);
    }
  }