import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
  FormArray,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent {
  private formBuilder = inject(FormBuilder);
  notification: string = ''; // Stores success message

  // Defining the reactive form structure
  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required], // First Name is required
    lastName: ['', Validators.required], // Last Name is required
    email: ['', [Validators.required, Validators.email]], // Email with validation
    phone: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ], // 10-digit phone number validation
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['', [Validators.minLength(6), Validators.maxLength(6)]], // Zip must be 6 digits
    }),
    hobbies: this.formBuilder.array([this.formBuilder.control('')]), // Hobbies list with at least one input field
    password: ['', [Validators.required, this.validatePassword()]], // Password with custom validation
  });

  // Getter to access hobbies FormArray
  get hobbies() {
    return this.profileForm.get('hobbies') as FormArray;
  }

  // Function to add new hobbies, max limit 3
  addHobbies() {
    if (this.hobbies.length < 3) {
      this.hobbies.push(this.formBuilder.control(''));
    }
  }

  // Function to handle form submission
  onSubmit() {
    if (this.profileForm.valid) {
      localStorage.setItem(
        'profileData',
        JSON.stringify(this.profileForm.value)
      ); // Save data locally
      this.notification = 'Profile saved successfully'; // Show success message
      this.profileForm.reset(); // Reset the form after submission

      // Hide notification after 3 seconds
      setTimeout(() => {
        this.notification = '';
      }, 3000);
    }
  }

  // Custom validator for password validation
  validatePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password: string = control.value || '';
      const hasUpperCase = /[A-Z]/.test(password); // Must contain an uppercase letter
      const hasNumber = /[0-9]/.test(password); // Must contain a number
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Must contain a special character
      const hasMinCharacters = password.length >= 8; // Must be at least 8 characters long

      return hasUpperCase &&
        hasNumber &&
        hasSpecialCharacter &&
        hasMinCharacters
        ? null
        : { notValid: true };
    };
  }
}
