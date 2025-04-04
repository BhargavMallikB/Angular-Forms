import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-td-form',
  standalone: true,
  imports: [
    FormsModule, // Enables Template-Driven Forms
    CommonModule, // Required for basic Angular directives
    MatCardModule, // Material Card for UI styling
    MatFormFieldModule, // Material Form Field for better input design
    MatInputModule, // Material Input for user input fields
    MatButtonModule, // Material Buttons for actions
    MatListModule, // Material List for displaying saved users
  ],
  templateUrl: './template-driven-form.component.html',
  styleUrl: './template-driven-form.component.scss',
})
export class TemplateDrivenFormComponent {
  // User model to hold form data
  user = {
    firstName: '',
    lastName: '',
    email: '',
    age: null,
  };

  // Array to store saved users
  savedUsers: any[] = [];
  // Notification message
  notification: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Handles form submission
   * @param form - The submitted NgForm
   */
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.savedUsers.push({ ...form.value }); // Save user data
      this.notification = `User ${form.value.firstName} ${form.value.lastName} added successfully!`;

      // Clear notification after 3 seconds
      setTimeout(() => {
        this.notification = '';
      }, 3000);

      this.onReset(form); // Reset form after submission
    }
  }

  /**
   * Resets the form
   * @param form - The NgForm instance to reset
   */
  onReset(form: NgForm) {
    form.resetForm();
  }

  /**
   * Clears all saved user entries
   */
  onClearAll() {
    this.savedUsers = [];
    this.cdr.detectChanges(); // Force Angular to detect changes
  }
}
