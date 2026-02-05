import { createReducer, on } from '@ngrx/store';
import { initialUserState, UserState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,

  // Load Users
  on(UserActions.loadUsers, (state, action) => {
    console.log('Reducer received loadUsers:', action);
    console.log('UserState before loadUsers:', state);
    return {
      ...state,
      loading: true,
      error: null,
    };
  }),

  on(UserActions.loadUsersSuccess, (state, { users, totalCount }) => ({
    ...state,
    items: users,
    totalCount,
    loading: false,
  })),

  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load User by ID
  on(UserActions.loadUserById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.loadUserByIdSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    loading: false,
  })),

  on(UserActions.loadUserByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create User
  on(UserActions.createUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state,
    items: [...state.items, user],
    loading: false,
  })),

  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update User
  on(UserActions.updateUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    items: state.items.map((u) => (u.id === user.id ? user : u)),
    selectedUser: state.selectedUser?.id === user.id ? user : state.selectedUser,
    loading: false,
  })),

  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete User
  on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((u) => u.id !== id),
    selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
    loading: false,
  })),

  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Clear Error
  on(UserActions.clearUserError, (state) => ({
    ...state,
    error: null,
  })),
);
