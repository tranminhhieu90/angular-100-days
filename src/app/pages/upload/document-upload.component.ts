import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadService, UploadResponse } from '@app/services/upload.service';

@Component({
  selector: 'app-document-upload',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="document-upload-container">
      <h3>Upload Document</h3>

      <form [formGroup]="documentForm" (ngSubmit)="onSubmit()">
        <!-- File Input -->
        <div class="form-group">
          <label for="documentFile">Chọn file *</label>
          <div class="file-input-wrapper">
            <input
              type="file"
              id="documentFile"
              accept=".pdf,.doc,.docx"
              (change)="onFileSelected($event)"
            />
            @if (selectedFile()) {
              <div class="selected-file">
                <span>📄 {{ selectedFile()?.name }}</span>
                <span class="file-size"> ({{ formatFileSize(selectedFile()?.size || 0) }}) </span>
              </div>
            }
          </div>
          @if (fileError()) {
            <div class="error-text">{{ fileError() }}</div>
          }
        </div>

        <!-- Title -->
        <div class="form-group">
          <label for="title">Tiêu đề *</label>
          <input
            type="text"
            id="title"
            formControlName="title"
            placeholder="Nhập tiêu đề document"
          />
          @if (documentForm.get('title')?.invalid && documentForm.get('title')?.touched) {
            <div class="error-text">Tiêu đề là bắt buộc</div>
          }
        </div>

        <!-- Description -->
        <div class="form-group">
          <label for="description">Mô tả</label>
          <textarea
            id="description"
            formControlName="description"
            rows="4"
            placeholder="Nhập mô tả về document"
          ></textarea>
        </div>

        <!-- Category -->
        <div class="form-group">
          <label for="category">Danh mục *</label>
          <select id="category" formControlName="category">
            <option value="">-- Chọn danh mục --</option>
            <option value="contract">Hợp đồng</option>
            <option value="report">Báo cáo</option>
            <option value="invoice">Hóa đơn</option>
            <option value="other">Khác</option>
          </select>
          @if (documentForm.get('category')?.invalid && documentForm.get('category')?.touched) {
            <div class="error-text">Danh mục là bắt buộc</div>
          }
        </div>

        <!-- Submit Buttons -->
        <div class="form-actions">
          <button
            type="submit"
            class="btn btn-primary"
            [disabled]="documentForm.invalid || !selectedFile() || isUploading()"
          >
            {{ isUploading() ? 'Đang upload...' : 'Upload Document' }}
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            (click)="resetForm()"
            [disabled]="isUploading()"
          >
            Làm mới
          </button>
        </div>

        <!-- Messages -->
        @if (errorMessage()) {
          <div class="message error">{{ errorMessage() }}</div>
        }
        @if (successMessage()) {
          <div class="message success">
            {{ successMessage() }}
            @if (uploadedUrl()) {
              <a [href]="uploadedUrl()" target="_blank" class="view-link"> Xem document </a>
            }
          </div>
        }

        <!-- Upload Progress -->
        @if (isUploading()) {
          <div class="progress-container">
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="uploadProgress()"></div>
            </div>
            <span class="progress-text">{{ uploadProgress() }}%</span>
          </div>
        }
      </form>
    </div>
  `,
  styles: [
    `
      .document-upload-container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        background-color: white;
        border: 1px solid #e0e0e0;
        border-radius: 8px;

        h3 {
          margin-bottom: 1.5rem;
          color: #333;
          text-align: center;
        }
      }

      .form-group {
        margin-bottom: 1.5rem;

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #333;
        }

        input[type='text'],
        textarea,
        select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          transition: border-color 0.3s;

          &:focus {
            outline: none;
            border-color: #4caf50;
          }
        }

        input[type='file'] {
          width: 100%;
          padding: 0.5rem;
          border: 1px dashed #ddd;
          border-radius: 4px;
          cursor: pointer;

          &:hover {
            border-color: #4caf50;
          }
        }
      }

      .selected-file {
        margin-top: 0.5rem;
        padding: 0.5rem;
        background-color: #f5f5f5;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .file-size {
          color: #666;
          font-size: 0.875rem;
        }
      }

      .error-text {
        margin-top: 0.25rem;
        color: #f44336;
        font-size: 0.875rem;
      }

      .form-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
      }

      .btn {
        flex: 1;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        &.btn-primary {
          background-color: #4caf50;
          color: white;

          &:hover:not(:disabled) {
            background-color: #45a049;
          }
        }

        &.btn-secondary {
          background-color: #9e9e9e;
          color: white;

          &:hover:not(:disabled) {
            background-color: #757575;
          }
        }
      }

      .message {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 4px;
        font-size: 0.875rem;

        &.error {
          background-color: #ffebee;
          color: #c62828;
          border: 1px solid #ef5350;
        }

        &.success {
          background-color: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #66bb6a;
        }

        .view-link {
          display: inline-block;
          margin-top: 0.5rem;
          color: #1976d2;
          text-decoration: underline;
        }
      }

      .progress-container {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .progress-bar {
        flex: 1;
        height: 24px;
        background-color: #e0e0e0;
        border-radius: 12px;
        overflow: hidden;

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #4caf50, #8bc34a);
          transition: width 0.3s ease;
        }
      }

      .progress-text {
        font-weight: bold;
        color: #4caf50;
        min-width: 50px;
      }
    `,
  ],
})
export class DocumentUploadComponent {
  private uploadService = inject(UploadService);
  private fb = inject(FormBuilder);

  documentForm: FormGroup;
  selectedFile = signal<File | null>(null);
  fileError = signal<string | null>(null);
  isUploading = signal(false);
  uploadProgress = signal(0);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  uploadedUrl = signal<string | null>(null);

  private readonly MAX_SIZE = 10 * 1024 * 1024; // 10MB
  private readonly ALLOWED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  private readonly ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

  constructor() {
    this.documentForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.fileError.set(null);

    // Validate
    const error = this.uploadService.validateFile(file, {
      maxSize: this.MAX_SIZE,
      allowedTypes: this.ALLOWED_TYPES,
      allowedExtensions: this.ALLOWED_EXTENSIONS,
    });

    if (error) {
      this.fileError.set(error);
      this.selectedFile.set(null);
      return;
    }

    this.selectedFile.set(file);
  }

  onSubmit(): void {
    if (this.documentForm.invalid || !this.selectedFile()) return;

    const file = this.selectedFile()!;
    const formValue = this.documentForm.value;

    this.isUploading.set(true);
    this.uploadProgress.set(0);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.uploadService
      .uploadDocument(file, {
        title: formValue.title,
        description: formValue.description,
        category: formValue.category,
      })
      .subscribe({
        next: (response: UploadResponse) => {
          this.isUploading.set(false);
          this.uploadProgress.set(100);
          this.successMessage.set(response.message || 'Document đã được upload thành công!');
          this.uploadedUrl.set(response.fileUrl || null);

          // Reset form sau 2s
          setTimeout(() => this.resetForm(), 2000);
        },
        error: (error) => {
          this.isUploading.set(false);
          this.uploadProgress.set(0);
          this.errorMessage.set(error.error?.message || 'Upload thất bại. Vui lòng thử lại.');
        },
      });
  }

  resetForm(): void {
    this.documentForm.reset();
    this.selectedFile.set(null);
    this.fileError.set(null);
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.uploadedUrl.set(null);
    this.uploadProgress.set(0);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
}
