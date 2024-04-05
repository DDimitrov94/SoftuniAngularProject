import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Recipe } from './types/recipe';
import { User } from './types/user';
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

  likeRecipe(recipeId: string | undefined) {
    return this.http.put<Recipe>(`/api/recipe/${recipeId}/like`, {})
  }

  unlikeRecipe(recipeId: string | undefined) {
    return this.http.put<Recipe>(`/api/recipe/${recipeId}/unlike`, {})
  }

  deleteRecipe(recipeId: string | undefined) {
    return this.http.delete<Recipe>(`/api/recipe/${recipeId}/delete`, {})
  }

  getRecipes() {
    return this.http.get<Recipe[]>(`/api/recipe`)
  }

  getOwnRecipes() {
    return this.http.get<Recipe[]>(`/api/recipe/owned`)
  }

  getFavoriteRecipes() {
    return this.http.get<User>(`/api/auth/userInfo`)
  }

  searchRecipes(query:string) {
    return this.http.get<Recipe[]>(`/api/recipe/search/${query}`)
  }
}
