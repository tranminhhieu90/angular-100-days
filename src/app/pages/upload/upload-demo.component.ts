import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload';
import { AvatarUploadComponent } from './avatar-upload.component';
import { DocumentUploadComponent } from './document-upload.component';

@Component({
  selector: 'app-upload-demo',
  imports: [CommonModule, UploadComponent, AvatarUploadComponent, DocumentUploadComponent],
  template: `
    <div class="upload-demo-container">
      <h1>File Upload Demo</h1>
      <p class="subtitle">
        Các ví dụ về upload file với FormData trong Angular
      </p>

      <div class="tabs">
        <button
          class="tab-button"
          [class.active]="activeTab() === 'full'"
          (click)="activeTab.set('full')"
        >
          Full Featured Upload
        </button>
        <button
          class="tab-button"
          [class.active]="activeTab() === 'avatar'"
          (click)="activeTab.set('avatar')"
        >
          Avatar Upload
        </button>
        <button
          class="tab-button"
          [class.active]="activeTab() === 'document'"
          (click)="activeTab.set('document')"
        >
          Document Upload
        </button>
      </div>

      <div class="tab-content">
        @switch (activeTab()) {
          @case ('full') {
            <div class="tab-panel">
              <div class="description">
                <h3>Full Featured Upload</h3>
                <p>
                  Upload nhiều file cùng lúc với drag & drop, progress tracking,
                  và quản lý trạng thái chi tiết.
                </p>
                <ul>
                  <li>✅ Drag & drop multiple files</li>
                  <li>✅ Real-time progress tracking</li>
                  <li>✅ File validation</li>
                  <li>✅ Retry failed uploads</li>
                  <li>✅ Remove files from queue</li>
                </ul>
              </div>
              <app-upload></app-upload>
            </div>
          }
          @case ('avatar') {
            <div class="tab-panel">
              <div class="description">
                <h3>Avatar Upload</h3>
                <p>
                  Upload ảnh đại diện đơn giản với preview và validation.
                </p>
                <ul>
                  <li>✅ Image preview</li>
                  <li>✅ File size validation (max 2MB)</li>
                  <li>✅ Image format validation</li>
                  <li>✅ Clean and simple UI</li>
                </ul>
              </div>
              <app-avatar-upload></app-avatar-upload>
            </div>
          }
          @case ('document') {
            <div class="tab-panel">
              <div class="description">
                <h3>Document Upload</h3>
                <p>
                  Upload document kèm metadata sử dụng Reactive Forms.
                </p>
                <ul>
                  <li>✅ Form validation</li>
                  <li>✅ Document metadata (title, description, category)</li>
                  <li>✅ File format validation (PDF, DOC, DOCX)</li>
                  <li>✅ Progress tracking</li>
                </ul>
              </div>
              <app-document-upload></app-document-upload>
            </div>
          }
        }
      </div>

      <div class="implementation-note">
        <h3>📝 Implementation Notes</h3>
        <div class="note-content">
          <h4>BaseService Methods:</h4>
          <ul>
            <li><code>upload(endpoint, formData)</code> - Upload đơn giản</li>
            <li><code>uploadWithProgress(endpoint, formData)</code> - Upload với progress</li>
            <li><code>uploadMultiple(endpoint, files)</code> - Upload nhiều files</li>
          </ul>

          <h4>UploadService Methods:</h4>
          <ul>
            <li><code>uploadFile(file, additionalData?)</code> - Upload single file</li>
            <li><code>uploadFileWithProgress(file, additionalData?)</code> - Upload với progress tracking</li>
            <li><code>uploadMultipleFiles(files, additionalData?)</code> - Upload multiple files</li>
            <li><code>uploadAvatar(file, userId?)</code> - Upload avatar</li>
            <li><code>uploadDocument(file, metadata)</code> - Upload document với metadata</li>
            <li><code>validateFile(file, options)</code> - Validate file</li>
          </ul>

          <h4>Key Features:</h4>
          <ul>
            <li>✨ Signals-based state management</li>
            <li>✨ Computed values cho reactive UI</li>
            <li>✨ File validation (size, type, extension)</li>
            <li>✨ Progress tracking</li>
            <li>✨ Error handling</li>
            <li>✨ TypeScript strongly typed</li>
          </ul>

          <p class="tip">
            💡 <strong>Tip:</strong> Xem file <code>README.md</code> trong thư mục 
            <code>/src/app/pages/upload/</code> để biết thêm chi tiết về cách sử dụng.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .upload-demo-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 2rem;

      h1 {
        text-align: center;
        color: #333;
        margin-bottom: 0.5rem;
      }

      .subtitle {
        text-align: center;
        color: #666;
        margin-bottom: 2rem;
      }
    }

    .tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2rem;
      border-bottom: 2px solid #e0e0e0;
    }

    .tab-button {
      padding: 1rem 2rem;
      border: none;
      background-color: transparent;
      cursor: pointer;
      font-size: 1rem;
      color: #666;
      transition: all 0.3s;
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;

      &:hover {
        color: #4CAF50;
      }

      &.active {
        color: #4CAF50;
        border-bottom-color: #4CAF50;
        font-weight: 600;
      }
    }

    .tab-content {
      min-height: 400px;
    }

    .tab-panel {
      animation: fadeIn 0.3s ease-in;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .description {
      background-color: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      border-left: 4px solid #4CAF50;

      h3 {
        margin-top: 0;
        color: #333;
      }

      p {
        color: #666;
        line-height: 1.6;
      }

      ul {
        margin: 1rem 0;
        padding-left: 1.5rem;

        li {
          margin-bottom: 0.5rem;
          color: #555;
        }
      }
    }

    .implementation-note {
      margin-top: 3rem;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;

      h3 {
        margin-top: 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .note-content {
        background-color: rgba(255, 255, 255, 0.1);
        padding: 1.5rem;
        border-radius: 8px;
        backdrop-filter: blur(10px);

        h4 {
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #ffd700;

          &:first-child {
            margin-top: 0;
          }
        }

        ul {
          margin: 0.5rem 0;
          padding-left: 1.5rem;

          li {
            margin-bottom: 0.5rem;
            line-height: 1.6;
          }
        }

        code {
          background-color: rgba(0, 0, 0, 0.3);
          padding: 0.2rem 0.4rem;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }

        .tip {
          margin-top: 1.5rem;
          padding: 1rem;
          background-color: rgba(255, 215, 0, 0.2);
          border-left: 3px solid #ffd700;
          border-radius: 4px;
          line-height: 1.6;
        }
      }
    }

    @media (max-width: 768px) {
      .upload-demo-container {
        padding: 1rem;
      }

      .tabs {
        flex-wrap: wrap;
      }

      .tab-button {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
      }

      .implementation-note {
        padding: 1rem;

        .note-content {
          padding: 1rem;
        }
      }
    }
  `]
})
export class UploadDemoComponent {
  activeTab = signal<'full' | 'avatar' | 'document'>('full');
}
