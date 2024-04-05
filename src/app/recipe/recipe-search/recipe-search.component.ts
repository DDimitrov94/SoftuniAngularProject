import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  query: string = ''
  
  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) {}
  
  // query = this.activatedRoute.snapshot.queryParams['recipe']
  ngOnInit(): void {
    
    this.activatedRoute.queryParams.subscribe(params => {
      this.query = params['recipe'] ?? "";
      this.api.searchRecipes(this.query).subscribe((recipes) => {
        this.recipes = recipes
      })
    })
  }
}
