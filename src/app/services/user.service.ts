import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserCreateRequest } from '../models/user.model';
import { BaseService } from '../core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  getUsers(filters?: any): Observable<User[]> {
    return this.get<User[]>('users', filters);
  }

  getUserById(id: number): Observable<User> {
    return this.get<User>(`users/${id}`);
  }

  createUser(user: UserCreateRequest): Observable<User> {
    return this.post<User>('users', user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.put<User>(`users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.delete<any>(`users/${id}`);
  }

  getUsersByRole(role: string): Observable<User[]> {
    return this.get<User[]>('users', { role });
  }

  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {
    return this.post<any>(`users/${userId}/change-password`, {
      oldPassword,
      newPassword,
    });
  }
}
