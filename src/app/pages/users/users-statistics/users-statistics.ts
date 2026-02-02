import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-users-statistics',
  templateUrl: './users-statistics.html',
  styleUrl: './users-statistics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersStatisticsComponent {
  stats = signal({
    totalUsers: 156,
    activeUsers: 142,
    inactiveUsers: 14,
    newUsersThisMonth: 23,
  });
}
