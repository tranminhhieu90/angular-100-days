import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-create',
  imports: [RouterLink],
  templateUrl: './user-create.html',
  styleUrl: './user-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCreateComponent {
  message = signal('');

  onSubmit() {
    this.message.set('User đã được tạo thành công!');
  }
}
