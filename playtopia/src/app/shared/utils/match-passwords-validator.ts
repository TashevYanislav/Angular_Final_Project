import { ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passwordControlName: string,
  rePasswordControlName: string
): ValidatorFn {
  //   let doesMatch: boolean = false;

  //   if (password === rePassword) {
  //     doesMatch = true;
  //   }

  return (control) => {
    const passFirstControl = control.get(passwordControlName);
    const passSecondControl = control.get(rePasswordControlName);
    const areMatching = passFirstControl?.value === passSecondControl?.value;

    return areMatching ? null : { matchPasswordsValidator: true };
  };
}
