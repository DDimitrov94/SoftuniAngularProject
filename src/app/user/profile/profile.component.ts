import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  ownRecipes: Recipe[] = []
  // likedRecipes: Recipe[] = []

  ownerId = this.activatedRoute.snapshot.params['id']


  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.api.getOwnRecipes().subscribe((recipes) => {
      console.log(recipes);
      
    })
  }
}
