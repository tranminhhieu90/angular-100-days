import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: 'home', component: Home },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.Register),
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./pages/unauthorized/unauthorized').then((m) => m.UnauthorizedComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
    canActivate: [authGuard],
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./pages/users/users-layout/users-layout').then((m) => m.UsersLayoutComponent),
    loadChildren: () => import('./pages/users/users.routes').then((m) => m.USERS_ROUTES),
    canActivate: [roleGuard('admin')],
  },
  {
    path: 'taiga-demo',
    loadComponent: () => import('./pages/taiga-demo/taiga-demo').then((m) => m.TaigaDemoComponent),
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('./pages/upload/upload-demo.component').then((m) => m.UploadDemoComponent),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
