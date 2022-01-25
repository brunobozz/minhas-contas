import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp-content-header',
  templateUrl: './comp-content-header.component.html',
  styleUrls: ['./comp-content-header.component.scss'],
})
export class CompContentHeaderComponent implements OnInit {
  @Input() icon?: string = '';
  @Input() title1: any = '';
  @Input() title2?: any = '';

  constructor() {}

  ngOnInit(): void {}
}
