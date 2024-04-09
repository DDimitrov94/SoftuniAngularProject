import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent{
  ownRecipes: Recipe[] = []

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getOwnRecipes().subscribe((recipes) => {
      this.ownRecipes = recipes
    })
  }
}
