import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

// const routes: Routes = [
//   { path: '', pathMatch: 'full', redirectTo: '/home' },
//   { path: 'home', component: HomeComponent },
// ];


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent }, 
  { path: 'recipe', loadChildren:()=> import( './recipe/recipe.module' ).then((m)=> m.RecipeModule) },
  { path: 'auth', loadChildren:()=> import( './user/user.module' ).then((m)=> m.UserModule) },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
