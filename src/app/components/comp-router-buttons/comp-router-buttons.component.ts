import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comp-router-buttons',
  templateUrl: './comp-router-buttons.component.html',
})
export class CompRouterButtonsComponent {
  @Input() routes: any = [];
}
