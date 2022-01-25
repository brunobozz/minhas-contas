import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp-router-buttons',
  templateUrl: './comp-router-buttons.component.html',
  styleUrls: ['./comp-router-buttons.component.scss'],
})
export class CompRouterButtonsComponent implements OnInit {
  @Input() routes: any = [];

  constructor() {}

  ngOnInit(): void {}
}
