import { createAction, props } from '@ngrx/store';
import { User } from './user.state';

// Load Users
export const loadUsers = createAction(
  '[User Page] Load Users',
  props<{ page: number; pageSize: number }>(),
);

export const loadUsersSuccess = createAction(
  '[User API] Load Users Success',
  props<{ users: User[]; totalCount: number }>(),
);

export const loadUsersFailure = createAction(
  '[User API] Load Users Failure',
  props<{ error: string }>(),
);

// Load User by ID
export const loadUserById = createAction(
  '[User Detail Page] Load User by ID',
  props<{ id: number }>(),
);

export const loadUserByIdSuccess = createAction(
  '[User API] Load User by ID Success',
  props<{ user: User }>(),
);

export const loadUserByIdFailure = createAction(
  '[User API] Load User by ID Failure',
  props<{ error: string }>(),
);

// Create User
export const createUser = createAction(
  '[User Page] Create User',
  props<{ user: Omit<User, 'id'> }>(),
);

export const createUserSuccess = createAction(
  '[User API] Create User Success',
  props<{ user: User }>(),
);

export const createUserFailure = createAction(
  '[User API] Create User Failure',
  props<{ error: string }>(),
);

// Update User
export const updateUser = createAction('[User Page] Update User', props<{ user: User }>());

export const updateUserSuccess = createAction(
  '[User API] Update User Success',
  props<{ user: User }>(),
);

export const updateUserFailure = createAction(
  '[User API] Update User Failure',
  props<{ error: string }>(),
);

// Delete User
export const deleteUser = createAction('[User Page] Delete User', props<{ id: number }>());

export const deleteUserSuccess = createAction(
  '[User API] Delete User Success',
  props<{ id: number }>(),
);

export const deleteUserFailure = createAction(
  '[User API] Delete User Failure',
  props<{ error: string }>(),
);

// Clear Error
export const clearUserError = createAction('[User Page] Clear Error');
