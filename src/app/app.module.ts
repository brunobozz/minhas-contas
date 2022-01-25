import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, ArrayOfComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxCurrencyModule } from 'ngx-currency';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { ChartModule } from 'angular-highcharts';

// COMPONENTS
import { CompMainHeaderComponent } from './components/comp-main-header/comp-main-header.component';
import { CompMainNavbarComponent } from './components/comp-main-navbar/comp-main-navbar.component';
import { CompMainSidebarComponent } from './components/comp-main-sidebar/comp-main-sidebar.component';
import { CompMainContentComponent } from './components/comp-main-content/comp-main-content.component';
import { CompValuesTableComponent } from './components/comp-values-table/comp-values-table.component';
import { CompContentHeaderComponent } from './components/comp-content-header/comp-content-header.component';
import { CompBigestBillComponent } from './components/comp-bigest-bill/comp-bigest-bill.component';

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  declarations: [
    AppComponent,

    ArrayOfComponents,

    CompMainHeaderComponent,
    CompMainNavbarComponent,
    CompMainSidebarComponent,
    CompMainContentComponent,
    CompValuesTableComponent,
    CompContentHeaderComponent,
    CompBigestBillComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    NgxCurrencyModule,
    NgxMaskModule.forRoot(maskConfig),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      maxOpened: 2,
      autoDismiss: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
