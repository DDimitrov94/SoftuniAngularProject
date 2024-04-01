import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Recipe } from './types/recipe';
const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  createRecipe(
    name: string, 
    description: string, 
    image: string, 
    ingredients: string[], 
    preperationTime: number
    ){
    let recipe = {
      name,
      description,
      image,
      ingredients,
      preperationTime,
    }
    
    return this.http.post<Recipe>(`/api/recipe/create`, recipe)
  };

  getSingleRecipe(recipeId: string) {
    return this.http.get<Recipe>(`/api/recipe/${recipeId}`)
  }
  getRecipes() {
    return this.http.get<Recipe[]>(`/api/recipe`)
  }
}
