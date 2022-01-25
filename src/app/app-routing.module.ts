import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//ROUTES
import { PageBillsListComponent } from './pages/page-bills-list/page-bills-list.component';
import { PageBillsMonthComponent } from './pages/page-bills-month/page-bills-month.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';

const routes: Routes = [
  {
    path: 'home',
    component: PageHomeComponent,
  },
  {
    path: 'despesas',
    children: [
      {
        path: 'mes',
        component: PageBillsMonthComponent,
      },
      {
        path: 'lista',
        component: PageBillsListComponent,
      },
    ],
  },

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const ArrayOfComponents = [
  PageHomeComponent,
  PageBillsListComponent,
  PageBillsMonthComponent,
];
