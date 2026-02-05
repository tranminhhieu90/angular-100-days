import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { UserService } from '@app/services/user.service';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(({ page, pageSize }) =>
        this.userService.getUsers({ page, pageSize }).pipe(
          map((response) =>
            UserActions.loadUsersSuccess({
              users: response,
              totalCount: response.length,
            }),
          ),
          catchError((error) => of(UserActions.loadUsersFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserById),
      switchMap(({ id }) =>
        this.userService.getUserById(id).pipe(
          map((user) => UserActions.loadUserByIdSuccess({ user })),
          catchError((error) => of(UserActions.loadUserByIdFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  //   createUser$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(UserActions.createUser),
  //       mergeMap(({ user }) =>
  //         this.userService.createUser(user).pipe(
  //           map((newUser) => UserActions.createUserSuccess({ user: newUser })),
  //           catchError((error) => of(UserActions.createUserFailure({ error: error.message }))),
  //         ),
  //       ),
  //     ),
  //   );

  //   updateUser$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(UserActions.updateUser),
  //       mergeMap(({ user }) =>
  //         this.userService.updateUser(user).pipe(
  //           map((updatedUser) => UserActions.updateUserSuccess({ user: updatedUser })),
  //           catchError((error) => of(UserActions.updateUserFailure({ error: error.message }))),
  //         ),
  //       ),
  //     ),
  //   );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(() => UserActions.deleteUserSuccess({ id })),
          catchError((error) => of(UserActions.deleteUserFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
