import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // No need for standalone: true, it's default
})
export class HelloComponent {
  // Example signal state
  greeting = signal('Hello, Angular 100 Days!');

  // Example normal variable
  normalGreeting = 'Hello from normal variable!';

  // Example computed property
  greetingLength = computed(() => this.greeting().length);

  // Update normal variable
  updateNormalGreeting(newValue: string) {
    this.normalGreeting = newValue;
  }

  // Update signal
  updateGreeting(newValue: string) {
    this.greeting.set(newValue);
  }
}
