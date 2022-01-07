import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ChartModule } from 'angular-highcharts';

// COMPONENTS
import { CompMainHeaderComponent } from './components/comp-main-header/comp-main-header.component';
import { CompMainNavbarComponent } from './components/comp-main-navbar/comp-main-navbar.component';
import { CompMainSidebarComponent } from './components/comp-main-sidebar/comp-main-sidebar.component';
import { CompMainContentComponent } from './components/comp-main-content/comp-main-content.component';
import { CompValuesTableComponent } from './components/comp-values-table/comp-values-table.component';

// PAGES
import { PageHomeComponent } from './pages/page-home/page-home.component';

@NgModule({
  declarations: [
    AppComponent,
    CompMainHeaderComponent,
    CompMainNavbarComponent,
    CompMainSidebarComponent,
    CompMainContentComponent,
    PageHomeComponent,
    CompValuesTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      maxOpened: 2,
      autoDismiss: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
