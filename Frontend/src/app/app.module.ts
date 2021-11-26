import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModalComponent } from './components/chart-modal/chart-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StocksComponent,
    ChartModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents : [ChartModalComponent]
})
export class AppModule { }
