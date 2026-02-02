import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  imports: [RouterLink],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent {
  userId = signal('');
  message = signal('');

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId.set(id || '');
  }

  onSubmit() {
    this.message.set('User đã được cập nhật thành công!');
  }
}
