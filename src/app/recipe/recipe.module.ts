import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeRoutingModule } from './recipe-router.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';
import { UserLikedComponent } from './user-liked/user-liked.component';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';



@NgModule({
  declarations: [
    RecipesListComponent,
    CreateRecipeComponent,
    SingleRecipeComponent,
    UserLikedComponent,
    UserRecipesComponent,
    RecipeSearchComponent,
    EditRecipeComponent,
    RecipeCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RecipeRoutingModule
  ],
  exports: [
    RecipesListComponent,
    CreateRecipeComponent,
    SingleRecipeComponent,
    UserLikedComponent,
    UserRecipesComponent,
    RecipeSearchComponent,
    EditRecipeComponent,
    RecipeCardComponent

  ]
})
export class RecipeModule { }
