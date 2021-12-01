import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModalComponent } from './components/chart-modal/chart-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgApexchartsModule } from "ng-apexcharts";
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProfileComponent } from './components/profile/profile.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TradehistoryComponent } from './components/tradehistory/tradehistory.component';
import { AgGridModule } from 'ag-grid-angular';
import { BtnCellRenderer } from './button-cell-renderer.component';
import { ChartBtnRenderer } from './chart-btn-renderer.component';
import { SellBtnRenderer } from './sell-btn-renderer.component';
import { TradeModalComponent } from './components/trade-modal/trade-modal.component';

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
    BtnCellRenderer,
    ChartBtnRenderer,
    SellBtnRenderer,
    TradeModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgApexchartsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    AgGridModule.withComponents([BtnCellRenderer])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents : [
    ChartModalComponent,
    TradeModalComponent
  ]
})

export class AppModule { }
