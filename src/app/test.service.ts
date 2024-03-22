import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Recepi {
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get<Recepi[]>(`http://localhost:3000/recipe`);
  }

}
