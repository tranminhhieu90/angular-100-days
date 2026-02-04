import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected apiUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params: httpParams });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }

  patch<T>(endpoint: string, data: any): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  // Upload file với FormData
  upload<T>(endpoint: string, formData: FormData): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, formData);
  }

  // Upload file với progress tracking
  uploadWithProgress<T>(endpoint: string, formData: FormData): Observable<any> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  // Upload multiple files
  uploadMultiple<T>(endpoint: string, files: File[], fieldName: string = 'files'): Observable<T> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`${fieldName}[${index}]`, file, file.name);
    });
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, formData);
  }
}
