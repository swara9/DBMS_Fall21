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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { ProfileComponent } from './components/profile/profile.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TradehistoryComponent } from './components/tradehistory/tradehistory.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StocksComponent,
    ChartModalComponent,
    NavbarComponent,
    ProfileComponent,
    PortfolioComponent,
    TradehistoryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgApexchartsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents : [ChartModalComponent]
})
export class AppModule { }
