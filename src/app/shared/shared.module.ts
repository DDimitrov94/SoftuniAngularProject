import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './validators/email.directive';
import { ConvertTimePipe } from './convert-time.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RandomRecipeComponent } from './random-recipe/random-recipe.component';
import { ApiService } from '../api.service';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EmailDirective,
    ConvertTimePipe,
    RandomRecipeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    EmailDirective,
    ConvertTimePipe,    
    RandomRecipeComponent,
  ]
})
export class SharedModule { }
