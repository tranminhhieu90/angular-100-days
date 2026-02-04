import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadService, UploadResponse } from '../../services/upload.service';

@Component({
  selector: 'app-avatar-upload',
  imports: [CommonModule],
  template: `
    <div class="avatar-upload-container">
      <h3>Upload Avatar</h3>

      <div class="avatar-preview">
        @if (previewUrl()) {
          <img [src]="previewUrl()" alt="Avatar preview" />
        } @else {
          <div class="avatar-placeholder">
            <span>👤</span>
          </div>
        }
      </div>

      <div class="upload-controls">
        <label for="avatarInput" class="btn btn-primary">
          Chọn ảnh
          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            (change)="onFileSelected($event)"
            hidden
          />
        </label>

        @if (selectedFile()) {
          <button class="btn btn-success" (click)="uploadAvatar()" [disabled]="isUploading()">
            {{ isUploading() ? 'Đang upload...' : 'Upload' }}
          </button>
          <button class="btn btn-secondary" (click)="clearSelection()" [disabled]="isUploading()">
            Hủy
          </button>
        }
      </div>

      @if (errorMessage()) {
        <div class="error-message">{{ errorMessage() }}</div>
      }

      @if (successMessage()) {
        <div class="success-message">{{ successMessage() }}</div>
      }
    </div>
  `,
  styles: [
    `
      .avatar-upload-container {
        max-width: 400px;
        margin: 2rem auto;
        padding: 2rem;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        text-align: center;
      }

      .avatar-preview {
        width: 200px;
        height: 200px;
        margin: 1.5rem auto;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid #e0e0e0;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .avatar-placeholder {
        width: 100%;
        height: 100%;
        background-color: #f0f0f0;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          font-size: 5rem;
        }
      }

      .upload-controls {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        margin-top: 1.5rem;
      }

      .btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s ease;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &.btn-primary {
          background-color: #4caf50;
          color: white;
        }

        &.btn-success {
          background-color: #2196f3;
          color: white;
        }

        &.btn-secondary {
          background-color: #9e9e9e;
          color: white;
        }
      }

      .error-message {
        margin-top: 1rem;
        padding: 0.75rem;
        background-color: #ffebee;
        color: #c62828;
        border-radius: 4px;
        font-size: 0.875rem;
      }

      .success-message {
        margin-top: 1rem;
        padding: 0.75rem;
        background-color: #e8f5e9;
        color: #2e7d32;
        border-radius: 4px;
        font-size: 0.875rem;
      }
    `,
  ],
})
export class AvatarUploadComponent {
  private uploadService = inject(UploadService);

  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);
  isUploading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  private readonly MAX_SIZE = 2 * 1024 * 1024; // 2MB
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // Reset messages
    this.errorMessage.set(null);
    this.successMessage.set(null);

    // Validate
    const error = this.uploadService.validateFile(file, {
      maxSize: this.MAX_SIZE,
      allowedTypes: this.ALLOWED_TYPES,
    });

    if (error) {
      this.errorMessage.set(error);
      return;
    }

    // Set file and preview
    this.selectedFile.set(file);
    this.createPreview(file);
  }

  private createPreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl.set(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  uploadAvatar(): void {
    const file = this.selectedFile();
    if (!file) return;

    this.isUploading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.uploadService.uploadAvatar(file, 'user123').subscribe({
      next: (response: UploadResponse) => {
        this.isUploading.set(false);
        this.successMessage.set(response.message || 'Upload thành công!');

        // Nếu server trả về URL ảnh, cập nhật preview
        if (response.fileUrl) {
          this.previewUrl.set(response.fileUrl);
        }
      },
      error: (error) => {
        this.isUploading.set(false);
        this.errorMessage.set(error.error?.message || 'Upload thất bại. Vui lòng thử lại.');
      },
    });
  }

  clearSelection(): void {
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    this.errorMessage.set(null);
    this.successMessage.set(null);
  }
}
