// import { Component } from '@angular/core';
// import { ChildComponent } from './child.component';

// @Component({
//   selector: 'app-parent',
//   templateUrl: './parent.component.html',
//   styleUrls: ['./parent.component.css'],
//   imports: [ChildComponent],
// })
// export class ParentComponent {
//   parentValue: string = 'Giá trị ban đầu';

//   // Hàm để thay đổi giá trị từ parent
//   updateValue() {
//     this.parentValue = 'Giá trị được cập nhật từ Parent';
//   }

//   // Hàm khi nhận dữ liệu từ child
//   onChildValueChange(newValue: string) {
//     console.log('Parent nhận từ child:', newValue);
//     this.parentValue = newValue;
//   }
// }
import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  imports: [ChildComponent],
})
export class ParentComponent {
  // Dùng signal thay vì biến thường
  parentValue = signal<string>('Giá trị ban đầu');

  updateValue() {
    this.parentValue.set('Cập nhật từ Parent');
  }

  onChildChange(newValue: string) {
    console.log('Parent nhận từ child:', newValue);
    this.parentValue.set(newValue);
  }
}
