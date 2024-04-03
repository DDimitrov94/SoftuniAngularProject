import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-user-liked',
  templateUrl: './user-liked.component.html',
  styleUrls: ['./user-liked.component.css']
})
export class UserLikedComponent implements OnInit{
  likedRecipes: Recipe[] = []

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getFavoriteRecipes().subscribe((user) => {
      console.log(user);
      
      this.likedRecipes = user.favorites
    })
  }
}
