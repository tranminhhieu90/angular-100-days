export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserState {
  items: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

export const initialUserState: UserState = {
  items: [],
  selectedUser: null,
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
};
