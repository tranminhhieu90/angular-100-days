// import { Component, Input, Output, EventEmitter } from '@angular/core';

// @Component({
//   selector: 'app-child',
//   templateUrl: './child.component.html',
//   styleUrls: ['./child.component.css'],
// })
// export class ChildComponent {
//   @Input() value: string = '';
//   @Output() valueChange = new EventEmitter<string>();

//   onChange(newValue: string) {
//     this.value = newValue;
//     this.valueChange.emit(newValue);
//   }
// }

import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
})
export class ChildComponent {
  // Thay @Input bằng input() signal
  value = input<string>('');

  // Thay @Output bằng output() signal
  valueChange = output<string>();

  onChange(newValue: string) {
    console.log('Child onChange:', newValue);
    this.valueChange.emit(newValue);
  }
}
