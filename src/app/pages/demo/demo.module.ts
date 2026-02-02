import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './demo.component';
import { DemoChildComponent } from './demo-child.component';
import { HelloComponent } from '../hello';

@NgModule({
  imports: [CommonModule, HelloComponent],
  declarations: [DemoComponent, DemoChildComponent],
  exports: [DemoComponent, DemoChildComponent],
})
export class DemoModule {}
