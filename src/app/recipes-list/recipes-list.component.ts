import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit{
  constructor(private api: ApiService) {}
  
  ngOnInit(): void {
    this.api.getRecipes().subscribe((recipes) => {
      console.log(recipes);
    })
  }
}
