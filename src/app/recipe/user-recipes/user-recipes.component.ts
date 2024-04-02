import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css']
})
export class UserRecipesComponent implements OnInit{
  ownRecipes: Recipe[] = []
  // likedRecipes: Recipe[] = []

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getOwnRecipes().subscribe((recipes) => {
      console.log(recipes);
      this.ownRecipes = recipes
      console.log(this.ownRecipes);
    })
  }
}
