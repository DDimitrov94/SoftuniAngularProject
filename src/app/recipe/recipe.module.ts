import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeRoutingModule } from './recipe-router.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';



@NgModule({
  declarations: [
    RecipesListComponent,
    CreateRecipeComponent,
    SingleRecipeComponent,
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    RecipesListComponent,
    CreateRecipeComponent,
    SingleRecipeComponent,
    
  ]
})
export class RecipeModule { }
