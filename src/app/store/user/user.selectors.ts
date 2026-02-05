import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState = createFeatureSelector<UserState>('user');

// Selectors cho danh sách users
export const selectAllUsers = createSelector(selectUserState, (state: UserState) => state.items);

export const selectUsersLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading,
);

export const selectUsersError = createSelector(selectUserState, (state: UserState) => state.error);

export const selectTotalUserCount = createSelector(
  selectUserState,
  (state: UserState) => state.totalCount,
);

export const selectCurrentPage = createSelector(
  selectUserState,
  (state: UserState) => state.currentPage,
);

export const selectPageSize = createSelector(selectUserState, (state: UserState) => state.pageSize);

// Selector cho user được chọn
export const selectSelectedUser = createSelector(
  selectUserState,
  (state: UserState) => state.selectedUser,
);

// Selector kết hợp
export const selectUserWithLoading = createSelector(
  selectAllUsers,
  selectUsersLoading,
  (users, loading) => ({ users, loading }),
);

export const selectUserPageInfo = createSelector(
  selectAllUsers,
  selectTotalUserCount,
  selectCurrentPage,
  selectPageSize,
  selectUsersLoading,
  (items, totalCount, currentPage, pageSize, loading) => ({
    items,
    totalCount,
    currentPage,
    pageSize,
    loading,
  }),
);
