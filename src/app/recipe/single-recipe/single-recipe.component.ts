import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/interfaces/recipe';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit{
  recipe: Recipe | undefined 
  id = this.activatedRoute.snapshot.params['id']
  
  hasLiked: boolean = false;

  constructor(
    private api: ApiService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router ,
    private userService: UserService) {}
  
  ngOnInit(): void {
    this.api.getSingleRecipe(this.id).subscribe((recipe) => {
      this.recipe = recipe
    })
  }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get isOwner(): boolean {    
    return this.userService.user?._id == this.recipe?.owner?._id
  }

  addFavorite(recipeId: string | undefined) {
    this.api.likeRecipe(recipeId).subscribe((result) => {

      this.hasLiked = true
    })
  }

  removeFavorite(recipeId: string | undefined) {
    this.api.unlikeRecipe(recipeId).subscribe((result) => {

      this.hasLiked = false
    })
  }

  deleteRecipe(recipeId: string | undefined) {
    this.api.deleteRecipe(recipeId).subscribe((result) => {

      this.router.navigate(['/recipe/recipe-list'])
    })
  }

}
