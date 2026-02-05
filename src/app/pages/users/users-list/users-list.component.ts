import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from '@app/services/user.service';
import {
  loadUsers,
  selectAllUsers,
  selectUserPageInfo,
  selectUsersError,
  selectUsersLoading,
} from '@app/store';
import type { User } from '@app/store/user/user.state';
@Component({
  selector: 'app-users-list',
  imports: [RouterLink, CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  pageInfo$: Observable<any>;
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private store: Store,
  ) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUsersLoading);
    this.error$ = this.store.select(selectUsersError);
    this.pageInfo$ = this.store.select(selectUserPageInfo);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers({ page: 1, pageSize: 10 }));
    this.users$.subscribe((users) => {
      console.log('Users:', users);
      console.log('Users:', this.loading$);
    });
    this.cdr.markForCheck();
  }

  // loadUsers(): void {
  //   this.loading = true;
  //   this.error = null;

  //   this.userService.getUsers().subscribe({
  //     next: (data) => {
  //       this.users = data;
  //       this.loading = false;
  //       this.cdr.markForCheck();
  //     },
  //     error: (error) => {
  //       this.error = 'Không thể tải danh sách người dùng';
  //       this.loading = false;
  //       this.cdr.markForCheck();
  //       console.error('error222', error);
  //     },
  //   });
  // }

  // deleteUser(id: number): void {
  //   if (confirm('Bạn chắc chắn muốn xóa?')) {
  //     this.userService.deleteUser(id).subscribe({
  //       next: () => {
  //         this.users = this.users.filter((u) => u.id !== id);
  //       },
  //       error: (error) => {
  //         console.error('Lỗi xóa người dùng:', error);
  //       },
  //     });
  //   }
  // }
}
