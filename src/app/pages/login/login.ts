import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  username = signal('');
  password = signal('');
  error = signal('');

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  onSubmit() {
    const success = this.authService.login(this.username(), this.password());

    if (success) {
      // Get return URL from query params or default to home
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
      this.router.navigateByUrl(returnUrl);
    } else {
      this.error.set('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  }
}
