import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailDirective } from './validators/email.directive';
import { ConvertTimePipe } from './convert-time.pipe';



@NgModule({
  declarations: [
    EmailDirective,
    ConvertTimePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmailDirective,
    ConvertTimePipe
  ]
})
export class SharedModule { }
