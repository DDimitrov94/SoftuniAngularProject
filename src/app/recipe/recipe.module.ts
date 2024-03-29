import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeRoutingModule } from './recipe-router.module';



@NgModule({
  declarations: [RecipesListComponent],
  imports: [
    CommonModule,
    RecipeRoutingModule,
  ],
  exports: [
    RecipesListComponent
  ]
})
export class RecipeModule { }
