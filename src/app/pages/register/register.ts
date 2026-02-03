import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiTextfield, TuiIcon, TuiError, TuiDataList } from '@taiga-ui/core';

import {
  TuiDataListWrapper,
  TuiFieldErrorPipe,
  TuiInputNumber,
  TuiPassword,
  TuiSelect,
  TuiChevron,
} from '@taiga-ui/kit';
const ROLES = [
  { label: 'Người dùng', value: 'USER' },
  { label: 'Quản trị viên', value: 'ADMIN' },
];

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiIcon,
    TuiIcon,
    TuiButton,
    TuiError,
    TuiFieldErrorPipe,
    TuiInputNumber,
    TuiPassword,
    TuiDataListWrapper,
    TuiDataList,
    TuiSelect,
    TuiTextfield,
    TuiChevron,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  readonly roles = ROLES;
  readonly form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(1)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    console.log(this.form.value);
    console.log(this.form.valid);
    if (this.form.valid) {
      // Handle registration logic here
      alert('Registration successful!');
    }
  }
}
