import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User, UserCreateRequest } from '../../../models/user.model';
import { UpperCasePipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  imports: [UpperCasePipe, ReactiveFormsModule, CommonModule],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEdit = false;
  loading = false;
  submitting = false;
  userId: number | null = null;
  roles = ['admin', 'user', 'guest'];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        this.userId = parseInt(params['id'], 10);
        this.loadUser();
      }
    });
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [this.isEdit ? null : Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required],
    });
  }

  loadUser(): void {
    if (!this.userId) return;

    this.loading = true;
    this.userService.getUserById(this.userId).subscribe({
      next: (data: User) => {
        this.userForm.patchValue({
          name: data.name,
          email: data.email,
          role: data.role,
        });

        // Nếu là edit, xóa validation required cho password
        this.userForm.get('password')?.clearAsyncValidators();

        this.loading = false;
      },
      error: (error: any) => {
        console.error('Lỗi tải dữ liệu người dùng:', error);
        this.loading = false;
        alert('Không thể tải dữ liệu người dùng');
      },
    });
  }

  saveUser(): void {
    // Kiểm tra form hợp lệ
    if (this.userForm.invalid) {
      this.markFormGroupTouched(this.userForm);
      return;
    }

    this.submitting = true;
    const formData = this.userForm.value;

    if (this.isEdit && this.userId) {
      // Update user
      const updateData: Partial<User> = {
        name: formData.name,
        email: formData.email,
        role: formData.role as any,
      };

      // if (formData.password) {
      //   updateData['password'] = formData.password;
      // }

      this.userService.updateUser(this.userId, updateData).subscribe({
        next: () => {
          alert('Cập nhật người dùng thành công');
          this.router.navigate(['/users']);
          this.submitting = false;
        },
        error: (error: any) => {
          console.error('Lỗi cập nhật:', error);
          alert('Lỗi: ' + (error.error?.message || 'Cập nhật thất bại'));
          this.submitting = false;
        },
      });
    } else {
      // Create new user
      const newUser: UserCreateRequest = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      this.userService.createUser(newUser).subscribe({
        next: () => {
          alert('Tạo người dùng mới thành công');
          this.router.navigate(['/users']);
          this.submitting = false;
        },
        error: (error: any) => {
          console.error('Lỗi tạo mới:', error);
          alert('Lỗi: ' + (error.error?.message || 'Tạo mới thất bại'));
          this.submitting = false;
        },
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }

  // Helper method để đánh dấu tất cả fields là touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Getter cho các fields để dễ sử dụng trong template
  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get role() {
    return this.userForm.get('role');
  }
}
