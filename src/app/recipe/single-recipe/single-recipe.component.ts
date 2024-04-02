import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit{
  recipe: Recipe | undefined 
  id = this.activatedRoute.snapshot.params['id']

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.api.getSingleRecipe(this.id).subscribe((recipe) => {
      console.log(recipe)
      this.recipe = recipe
    })
  }
  
}
