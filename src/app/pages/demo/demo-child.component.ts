import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-demo-child',
  standalone: false,
  templateUrl: './demo-child.component.html',
})
export class DemoChildComponent {
  @Input() message = '';
  @Output() messageChange = new EventEmitter<string>();

  sendToParent() {
    this.messageChange.emit('Hello from child!');
  }
}
