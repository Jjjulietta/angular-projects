import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function forbiddenValidator(): ValidatorFn {
  return (control: AbstractControl<string>): ValidationErrors | null => {
    const hasSimbol = /[!@#%&*]/g.test(control.value);
    const hasNumber = /[0-9]/.test(control.value);
    const hasCapitalLetter = /[A-Z]/.test(control.value);
    /*const hasLowercaseLetter = /[a-z]/.test(control.value);*/
    const isLengthValid = control.value ? control.value.length > 7 : false;
    if (!hasSimbol) {
      return {
        forbiddenPassword:
          "Your password isn't strong enough. The password must contain at least one special character, e.g., ! @ # ?",
      };
    }
    if (!hasNumber) {
      return {
        forbiddenPassword:
          "Your password isn't strong enough. The password must contain a mixture of letters and numbers",
      };
    }
    if (!hasCapitalLetter) {
      return {
        forbiddenPassword:
          "Your password isn't strong enough. The password must contain a mixture of both uppercase and lowercase letters",
      };
    }
    /*if (!hasLowercaseLetter) {
      return {
        forbiddenPassword:
          "Your password isn't strong enough. The password must contain a mixture of both uppercase and lowercase letters",
      };
    }*/
    if (!isLengthValid) {
      return {
        forbiddenPassword:
          "Your password isn't strong enough. The password must contain at least 8 characters",
      };
    }
    return null;
    //return forbidden ? { forbiddenPassword: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appForbiddenPasswordDirective]',
  standalone: true,
})
export class ForbiddenPasswordDirective {
  constructor() {}
}
