import { ValidatorFn } from '@angular/forms';

export function emailValidator(domains: string[]): ValidatorFn {
  //[A-Za-z0-9]+@gmail.(com|bg)
  const domainString = domains.join('|');
  const regExp = new RegExp(`[A-Za-z0-9]+@gmail.(${domainString})`);
  return (control) => {
    const isInvaalid = control.value === '' || regExp.test(control.value);

    return isInvaalid?  null : {emailValidator:true};
  };
}
