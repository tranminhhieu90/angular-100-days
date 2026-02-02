import { Injectable, signal } from '@angular/core';

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'user' | 'guest';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Simulate current user (trong thực tế sẽ lấy từ API/localStorage)
  currentUser = signal<User | null>(null);

  // Check if user is logged in
  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  // Check if user has required role
  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user !== null && user.role === role;
  }

  // Login method (giả lập)
  login(username: string, password: string): boolean {
    // Trong thực tế, gọi API để xác thực
    if (username === 'admin' && password === 'admin') {
      this.currentUser.set({ id: 1, username: 'admin', role: 'admin' });
      return true;
    } else if (username === 'user' && password === 'user') {
      this.currentUser.set({ id: 2, username: 'user', role: 'user' });
      return true;
    }
    return false;
  }

  // Logout method
  logout(): void {
    this.currentUser.set(null);
  }
}
