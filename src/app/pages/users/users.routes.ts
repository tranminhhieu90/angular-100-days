import { Routes } from '@angular/router';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./users-list/users-list').then((m) => m.UsersListComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('./user-create/user-create').then((m) => m.UserCreateComponent),
  },
  {
    path: 'statistics',
    loadComponent: () =>
      import('./users-statistics/users-statistics').then((m) => m.UsersStatisticsComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./user-detail/user-detail').then((m) => m.UserDetailComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./user-edit/user-edit').then((m) => m.UserEditComponent),
  },
];
