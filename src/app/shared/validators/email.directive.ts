import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { emailValidator } from './email-validator';

@Directive({
  selector: '[emailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailDirective,
      multi: true,
    },
  ],
})
export class EmailDirective implements Validator {
  @Input() appEmail: string[] = [];
  constructor() {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const validatorFn = emailValidator(this.appEmail);
    return validatorFn(control);
  }
}
