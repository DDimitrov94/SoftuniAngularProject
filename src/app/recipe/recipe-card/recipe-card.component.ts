import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit{
  @Input() recipe!: Recipe;

  constructor (private userService: UserService) { }

  ngOnInit(): void {
  }
  get isLiked(): boolean | undefined {
    return this.recipe.favorite?.some((recipe) => recipe == this.userService.user?._id)
  }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get isOwner(): boolean {    
    return this.userService.user?._id == this.recipe?.owner?._id
  }
}
