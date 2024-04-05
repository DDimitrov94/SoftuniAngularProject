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
  hasLiked: boolean = false;

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.api.getSingleRecipe(this.id).subscribe((recipe) => {
      this.recipe = recipe
      console.log(recipe);

      //TODO need to get the current userID somehow to check if current user has liked
      
      // if (this.recipe.favorite?.some()) {
        
      // }


    })
  }

  addFavorite(recipeId: string | undefined) {
    this.api.likeRecipe(recipeId).subscribe((result) => {
      console.log(result)

      this.hasLiked = true
    })
  }

  removeFavorite(recipeId: string | undefined) {
    this.api.unlikeRecipe(recipeId).subscribe((result) => {
      console.log(result)

      this.hasLiked = false
    })
  }

  deleteRecipe(recipeId: string | undefined) {
    this.api.deleteRecipe(recipeId).subscribe((result) => {
      console.log(result)
    })
  }

}
