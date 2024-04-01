import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit{
  recipes: Recipe[] = []

  constructor(private api: ApiService) {}
  
  ngOnInit(): void {
    this.api.getRecipes().subscribe((recipes) => {
      console.log(recipes)
      this.recipes = recipes
    })
  }
}
