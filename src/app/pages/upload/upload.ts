import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { UploadService, UploadResponse } from '../../services/upload.service';

interface UploadedFile {
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  message?: string;
  url?: string;
}

@Component({
  selector: 'app-upload',
  imports: [CommonModule],
  templateUrl: './upload.html',
  styleUrl: './upload.scss',
})
export class UploadComponent {
  private uploadService = inject(UploadService);

  // Signals for state management
  selectedFiles = signal<UploadedFile[]>([]);
  isDragging = signal(false);
  isUploading = signal(false);

  // Computed values
  hasFiles = computed(() => this.selectedFiles().length > 0);
  uploadProgress = computed(() => {
    const files = this.selectedFiles();
    if (files.length === 0) return 0;
    const totalProgress = files.reduce((sum, f) => sum + f.progress, 0);
    return Math.round(totalProgress / files.length);
  });
  canUpload = computed(
    () =>
      this.hasFiles() &&
      !this.isUploading() &&
      this.selectedFiles().some((f) => f.status === 'pending'),
  );

  // File validation options
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
  private readonly ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.pdf'];

  /**
   * Handle file selection từ input
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.addFiles(Array.from(input.files));
      input.value = ''; // Reset input
    }
  }

  /**
   * Handle drag over
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  /**
   * Handle drag leave
   */
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  /**
   * Handle drop files
   */
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.addFiles(Array.from(files));
    }
  }

  /**
   * Thêm files vào danh sách
   */
  private addFiles(files: File[]): void {
    const newFiles: UploadedFile[] = files.map((file) => {
      // Validate file
      const error = this.uploadService.validateFile(file, {
        maxSize: this.MAX_FILE_SIZE,
        allowedTypes: this.ALLOWED_TYPES,
        allowedExtensions: this.ALLOWED_EXTENSIONS,
      });

      return {
        file,
        progress: 0,
        status: error ? 'error' : 'pending',
        message: error || undefined,
      };
    });

    this.selectedFiles.update((current) => [...current, ...newFiles]);
  }

  /**
   * Remove file khỏi danh sách
   */
  removeFile(index: number): void {
    this.selectedFiles.update((files) => files.filter((_, i) => i !== index));
  }

  /**
   * Upload single file
   */
  uploadFile(index: number): void {
    const files = this.selectedFiles();
    const fileToUpload = files[index];

    if (!fileToUpload || fileToUpload.status !== 'pending') return;

    // Update status to uploading
    this.updateFileStatus(index, 'uploading', 0);

    // Upload với progress tracking
    this.uploadService
      .uploadFileWithProgress(fileToUpload.file, {
        userId: '123', // Example: thêm metadata
        category: 'documents',
      })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            // Update progress
            const progress = event.total ? Math.round((100 * event.loaded) / event.total) : 0;
            this.updateFileStatus(index, 'uploading', progress);
          } else if (event.type === HttpEventType.Response) {
            // Upload complete
            const response = event.body as UploadResponse;
            this.updateFileStatus(index, 'success', 100, response.message, response.fileUrl);
          }
        },
        error: (error) => {
          this.updateFileStatus(index, 'error', 0, error.error?.message || 'Upload failed');
        },
      });
  }

  /**
   * Upload tất cả files pending
   */
  uploadAllFiles(): void {
    if (!this.canUpload()) return;

    this.isUploading.set(true);
    const files = this.selectedFiles();

    files.forEach((file, index) => {
      if (file.status === 'pending') {
        this.uploadFile(index);
      }
    });

    // Reset uploading status sau khi tất cả complete
    setTimeout(() => {
      this.isUploading.set(false);
    }, 1000);
  }

  /**
   * Clear tất cả files
   */
  clearAll(): void {
    this.selectedFiles.set([]);
  }

  /**
   * Clear files đã upload thành công
   */
  clearSuccessful(): void {
    this.selectedFiles.update((files) => files.filter((f) => f.status !== 'success'));
  }

  /**
   * Update file status
   */
  private updateFileStatus(
    index: number,
    status: UploadedFile['status'],
    progress: number,
    message?: string,
    url?: string,
  ): void {
    this.selectedFiles.update((files) => {
      const updated = [...files];
      updated[index] = {
        ...updated[index],
        status,
        progress,
        message,
        url,
      };
      return updated;
    });
  }

  /**
   * Format file size
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Get icon class based on file type
   */
  getFileIcon(file: File): string {
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type === 'application/pdf') return '📄';
    return '📎';
  }
}
