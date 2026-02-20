import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { customValidators } from './validators/validators';
import { FormKeys } from './form-control-keys.const';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

type ProfileForm = {
  [FormKeys.firstName]: FormControl<string>;
  [FormKeys.lastName]: FormControl<string>;
  [FormKeys.email]: FormControl<string>;
  [FormKeys.phoneNumber]: FormControl<string>;
  [FormKeys.role]: FormControl<ProfileRole>;
  [FormKeys.isSubscribed]: FormControl<boolean>;
};

enum ProfileRole {
  Developer = 'developer',
  Product = 'product',
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  readonly roleOptions = Object.values(ProfileRole) as ProfileRole[];

  private readonly formBuilder = inject(FormBuilder);

  form = this.formBuilder.group<ProfileForm>({
    [FormKeys.firstName]: this.formBuilder.nonNullable.control('', [
      Validators.required,
    ]),
    [FormKeys.lastName]: this.formBuilder.nonNullable.control('', [
      Validators.required,
    ]),
    [FormKeys.email]: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required, customValidators(FormKeys.email)],
      updateOn: 'blur',
    }),
    [FormKeys.phoneNumber]: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required, customValidators(FormKeys.phoneNumber)],
      updateOn: 'blur',
    }),
    [FormKeys.role]: this.formBuilder.nonNullable.control(
      ProfileRole.Developer,
      [Validators.required]
    ),
    [FormKeys.isSubscribed]: this.formBuilder.nonNullable.control(true),
  });

  submitForm(): void {
    console.log(this.form.getRawValue());
  }
}
