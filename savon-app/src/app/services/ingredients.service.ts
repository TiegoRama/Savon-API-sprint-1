import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/Ingredient';


@Injectable({
  providedIn: 'root'
})
export class IngredientService {

    private apiUrl = 'http://localhost:8080/api-savon/v1';

    constructor(private http: HttpClient) {}

    /**
    * Récupère tous les ingrédients depuis l'API.
    * @returns Un Observable contenant la liste des ingrédients.
    */
    getAllIngredients(): Observable<Ingredient[]> {
        return this.http.get<Ingredient[]>(`${this.apiUrl}/ingredient`);
  }

}