import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton, TuiDataList, TuiIcon, TuiTextfield } from '@taiga-ui/core';

import {
  TuiChevron,
  TuiDataListWrapper,
  TuiInputNumber,
  TuiPassword,
  TuiSelect,
} from '@taiga-ui/kit';
const ROLES = [
  { label: 'Người dùng', value: 'USER' },
  { label: 'Quản trị viên', value: 'ADMIN' },
];

const ERROR_MESSAGES: { [key: string]: { [key: string]: string } } = {
  email: {
    required: 'Email là bắt buộc',
    email: 'Email không hợp lệ',
  },
  password: {
    required: 'Mật khẩu là bắt buộc',
    minlength: 'Mật khẩu phải có ít nhất 6 ký tự',
  },
  confirmPassword: {
    required: 'Xác nhận mật khẩu là bắt buộc',
  },
  name: {
    required: 'Tên là bắt buộc',
  },
  age: {
    required: 'Tuổi là bắt buộc',
    min: 'Tuổi phải lớn hơn 0',
  },
  role: {
    required: 'Vui lòng chọn vai trò',
  },
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiIcon,
    TuiIcon,
    TuiButton,
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
  readonly errorMessages = ERROR_MESSAGES;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
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

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);

    if (!control || !control.errors || !control.touched) {
      return '';
    }
    this.cdr.markForCheck();
    const errors = control.errors;
    const errorKey = Object.keys(errors)[0];
    console.log('Error Key:', errorKey, this.errorMessages[fieldName]?.[errorKey]);
    console.log('32323 Key:', this.form.get('email')?.invalid, this.form.get('email')?.touched);

    return this.errorMessages[fieldName]?.[errorKey] || 'Lỗi không xác định';
  }

  onSubmit() {
    console.log(this.form.value);
    console.log(this.form.valid);
    if (this.form.valid) {
      // Handle registration logic here
      alert('Registration successful!');
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }
}
