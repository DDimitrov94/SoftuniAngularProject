import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateRecipeComponent } from "./create-recipe/create-recipe.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { UserService } from "../user/user.service";

const routes: Routes = [
    {path: 'recipe-create', component: CreateRecipeComponent},
    {path: 'recipe-list', component: RecipesListComponent},

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule {}