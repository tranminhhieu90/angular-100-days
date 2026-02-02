import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: 'home', component: Home },

  // Login page
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginComponent),
  },

  // Unauthorized page
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./pages/unauthorized/unauthorized').then((m) => m.UnauthorizedComponent),
  },

  // About page - Yêu cầu login, role nào cũng được
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    canActivate: [authGuard],
  },

  // Users module - Yêu cầu login + role admin
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users-layout/users-layout').then((m) => m.UsersLayoutComponent),
    loadChildren: () => import('./pages/users/users.routes').then((m) => m.USERS_ROUTES),
    canActivate: [roleGuard('admin')],
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Lazy Load cho trang Not Found
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
