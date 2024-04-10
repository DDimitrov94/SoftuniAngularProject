import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './interfaces/recipe';
import { User } from './interfaces/user';
import { ErrorResponse } from './interfaces/error';

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

  editRecipe(
    name: string, 
    description: string, 
    image: string, 
    ingredients: string[], 
    preperationTime: number,
    recipeId: string
    ){
    let recipe = {
      name,
      description,
      image,
      ingredients,
      preperationTime,
      }
      
    return this.http.put<Recipe>(`/api/recipe/${recipeId}/edit`, recipe )
  }

  deleteRecipe(recipeId: string | undefined) {
    return this.http.delete<Recipe>(`/api/recipe/${recipeId}/delete`, {})
  }

  getSingleRecipe(recipeId: string) {
    return this.http.get<Recipe>(`/api/recipe/${recipeId}`)
  }

  getRandomRecipe() {
    return this.http.get<Recipe>('/api/recipe/random')
  }

  likeRecipe(recipeId: string | undefined) {
    return this.http.put<Recipe>(`/api/recipe/${recipeId}/like`, {})
  }

  unlikeRecipe(recipeId: string | undefined) {
    return this.http.put<Recipe>(`/api/recipe/${recipeId}/unlike`, {})
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
    return this.http.get<Recipe[]|ErrorResponse>(`/api/recipe/search/${query}`)
  }
}
