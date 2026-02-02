import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  standalone: false,
  templateUrl: './demo.component.html',
})
export class DemoComponent {
  parentMessage = 'Hello from parent!';
  childMessage = '';

  onChildMessage(msg: string) {
    this.childMessage = msg;
  }
}
