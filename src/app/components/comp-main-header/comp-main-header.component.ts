import { Component } from '@angular/core';

@Component({
  selector: 'app-comp-main-header',
  templateUrl: './comp-main-header.component.html',
  styleUrls: ['./comp-main-header.component.scss'],
})
export class CompMainHeaderComponent {
  public routes: any = [
    {
      name: 'Home',
      path: '/home',
    },
    {
      name: 'Lista de Despesas',
      path: '/despesas/lista',
    },
    {
      name: 'Contas por Mês',
      path: '/despesas/mes',
    },
  ];
}
