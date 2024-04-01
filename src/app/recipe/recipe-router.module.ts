import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateRecipeComponent } from "./create-recipe/create-recipe.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { SingleRecipeComponent } from "./single-recipe/single-recipe.component";

const routes: Routes = [
    {path: 'recipe-create', component: CreateRecipeComponent},
    {path: 'recipe-list', component: RecipesListComponent},
    {path: 'recipe/:id', component: SingleRecipeComponent},

];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule {}