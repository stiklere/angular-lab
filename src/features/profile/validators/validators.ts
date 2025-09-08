import { ValidatorFn } from '@angular/forms';
import { FormKeys } from '../form-control-keys.const';

export const customValidators = (controlKey: FormKeys): ValidatorFn => {
  let strictRegex: RegExp;
  let errorMessage: string;

  switch (controlKey) {
    case FormKeys.email:
      strictRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      errorMessage = 'wrong email, e.g. name@domain.com';
      break;
    case FormKeys.phoneNumber:
      strictRegex = /^\+?[1-9]\d{7,14}$/;
      errorMessage = 'wrong phone number, e.g. +370...';
      break;
    default:
      return () => null;
  }

  return (control) => {
    const val = (control.value ?? '').toString().trim();

    if (!val) return null;

    return strictRegex.test(val)
      ? null
      : { [controlKey]: { message: errorMessage } };
  };
};
