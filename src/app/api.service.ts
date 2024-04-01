import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
const { apiUrl } = environment

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  createRecipe(recipe: { name: string | null | undefined; description: string | null | undefined; image: string | null | undefined; ingredients: unknown[] | undefined; }){
    console.log(recipe);
    
    return this.http.post(`/api/recipe/create`, recipe)
  };

  getRecipes() {

    return this.http.get(`/api/recipe`)
  }
}
