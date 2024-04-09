import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/interfaces/recipe';

@Component({
  selector: 'app-random-recipe',
  templateUrl: './random-recipe.component.html',
  styleUrls: ['./random-recipe.component.css']
})
export class RandomRecipeComponent implements OnInit{
  
  recipe: Recipe | undefined

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getRandomRecipe().subscribe((recipe) => {
      
      this.recipe = recipe
    })
  }
}
