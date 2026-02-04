import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../core/services/base.service';

export interface UploadResponse {
  success: boolean;
  message: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
}

export interface UploadProgress {
  progress: number;
  loaded: number;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class UploadService extends BaseService {
  /**
   * Upload single file
   * @param file - File cần upload
   * @param additionalData - Dữ liệu bổ sung (optional)
   * @returns Observable<UploadResponse>
   */
  uploadFile(file: File, additionalData?: Record<string, any>): Observable<UploadResponse> {
    const formData = this.createFormData(file, additionalData);
    return this.upload<UploadResponse>('upload', formData);
  }

  /**
   * Upload file với progress tracking
   * @param file - File cần upload
   * @param additionalData - Dữ liệu bổ sung (optional)
   * @returns Observable với events (progress, response)
   */
  uploadFileWithProgress(file: File, additionalData?: Record<string, any>): Observable<any> {
    const formData = this.createFormData(file, additionalData);
    return this.uploadWithProgress('upload', formData);
  }

  /**
   * Upload multiple files
   * @param files - Danh sách files cần upload
   * @param additionalData - Dữ liệu bổ sung (optional)
   * @returns Observable<UploadResponse>
   */
  uploadMultipleFiles(
    files: File[],
    additionalData?: Record<string, any>,
  ): Observable<UploadResponse> {
    const formData = new FormData();

    // Append files
    files.forEach((file, index) => {
      formData.append('files', file, file.name);
    });

    // Append additional data
    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });
    }

    return this.upload<UploadResponse>('upload/multiple', formData);
  }

  /**
   * Upload avatar/profile image
   * @param file - File ảnh
   * @param userId - ID của user (optional)
   * @returns Observable<UploadResponse>
   */
  uploadAvatar(file: File, userId?: string): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('avatar', file, file.name);
    if (userId) {
      formData.append('userId', userId);
    }
    return this.upload<UploadResponse>('upload/avatar', formData);
  }

  /**
   * Upload document với metadata
   * @param file - File document
   * @param metadata - Metadata của document
   * @returns Observable<UploadResponse>
   */
  uploadDocument(
    file: File,
    metadata: { title?: string; description?: string; category?: string },
  ): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('document', file, file.name);

    if (metadata.title) formData.append('title', metadata.title);
    if (metadata.description) formData.append('description', metadata.description);
    if (metadata.category) formData.append('category', metadata.category);

    return this.upload<UploadResponse>('upload/document', formData);
  }

  /**
   * Helper method để tạo FormData
   * @param file - File cần upload
   * @param additionalData - Dữ liệu bổ sung
   * @returns FormData
   */
  private createFormData(file: File, additionalData?: Record<string, any>): FormData {
    const formData = new FormData();
    formData.append('file', file, file.name);

    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        const value = additionalData[key];
        // Xử lý object/array thành JSON string
        if (typeof value === 'object' && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      });
    }

    return formData;
  }

  /**
   * Validate file trước khi upload
   * @param file - File cần validate
   * @param options - Các options validate
   * @returns Error message hoặc null nếu valid
   */
  validateFile(
    file: File,
    options: {
      maxSize?: number; // in bytes
      allowedTypes?: string[]; // ['image/jpeg', 'image/png']
      allowedExtensions?: string[]; // ['.jpg', '.png']
    },
  ): string | null {
    // Check file size
    if (options.maxSize && file.size > options.maxSize) {
      const maxSizeMB = (options.maxSize / (1024 * 1024)).toFixed(2);
      return `Kích thước file vượt quá ${maxSizeMB}MB`;
    }

    // Check file type
    if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
      return `Loại file không được hỗ trợ. Chỉ chấp nhận: ${options.allowedTypes.join(', ')}`;
    }

    // Check file extension
    if (options.allowedExtensions) {
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!options.allowedExtensions.includes(fileExtension)) {
        return `Định dạng file không được hỗ trợ. Chỉ chấp nhận: ${options.allowedExtensions.join(', ')}`;
      }
    }

    return null;
  }
}
