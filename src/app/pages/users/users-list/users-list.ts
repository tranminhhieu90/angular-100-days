import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-users-list',
  imports: [RouterLink],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  users = signal<User[]>([
    { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', role: 'Admin' },
    { id: 2, name: 'Trần Thị B', email: 'tranthib@example.com', role: 'User' },
    { id: 3, name: 'Lê Văn C', email: 'levanc@example.com', role: 'Editor' },
    { id: 4, name: 'Phạm Thị D', email: 'phamthid@example.com', role: 'User' },
  ]);
}
