// app/store/store.config.ts
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { UserEffects, userReducer } from './user';

// Reducers

// Effects
// import { ProductEffects } from './product.effects';
// import { AuthEffects } from './auth.effects';
// import { NotificationEffects } from './notification.effects';

export function provideAppStore() {
  return [
    provideStore({
      user: userReducer,
    }),
    provideEffects([UserEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ];
}
