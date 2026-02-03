import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
@Component({
  selector: 'taiga-demo',
  standalone: true,
  imports: [TuiButton],
  template: `
    <button tuiButton type="button" appearance="primary">Taiga UI button demo</button>

    <button appearance="accent" tuiButton type="button">Secondary</button>
  `,
})
export class TaigaDemoComponent {}
