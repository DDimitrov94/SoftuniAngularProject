import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.css']
})
export class RecipeSearchComponent implements OnInit{
  recipes: Recipe[] = []
  query = this.activatedRoute.snapshot.queryParams['recipe']

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.api.searchRecipes(this.query).subscribe((recipes) => {
      console.log(recipes);
      this.recipes = recipes
      console.log(this.recipes);
    })
    
  }
}
