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

interface ProfileForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  role: FormControl<ProfileRole>;
  isSubscribed: FormControl<boolean>;
}

enum ProfileRole {
  Developer = 'developer',
  Product = 'product',
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  readonly roleOptions = Object.values(ProfileRole) as ProfileRole[];

  private readonly formBuilder = inject(FormBuilder);

  form = this.formBuilder.group<ProfileForm>({
    firstName: this.formBuilder.nonNullable.control('', [Validators.required]),
    lastName: this.formBuilder.nonNullable.control('', [Validators.required]),
    email: this.formBuilder.nonNullable.control('', [Validators.required]),
    phoneNumber: this.formBuilder.nonNullable.control('', [
      Validators.required,
    ]),
    role: this.formBuilder.nonNullable.control(ProfileRole.Developer, [
      Validators.required,
    ]),
    isSubscribed: this.formBuilder.nonNullable.control(true, [
      Validators.required,
    ]),
  });

  submitForm(): void {
    console.log(this.form.getRawValue());
  }
}
