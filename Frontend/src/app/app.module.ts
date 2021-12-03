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
import { MatRadioModule } from '@angular/material/radio';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TradehistoryComponent } from './components/tradehistory/tradehistory.component';
import { AgGridModule } from 'ag-grid-angular';
import { LoginComponent } from './components/login/login.component';
import { TradeModalComponent } from './components/trade-modal/trade-modal.component';
import { ChartBtnRendererComponent } from './components/customCells/chart-btn-renderer/chart-btn-renderer.component';
import { BuyBtnRendererComponent } from './components/customCells/buy-btn-renderer/buy-btn-renderer.component';
import { SellBtnRendererComponent } from './components/customCells/sell-btn-renderer/sell-btn-renderer.component';
import { SInfoComponent } from './components/sinfo/sinfo.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StocksComponent,
    ChartModalComponent,
    NavbarComponent,
    PortfolioComponent,
    TradehistoryComponent,
    LoginComponent,
    TradeModalComponent,
    ChartBtnRendererComponent,
    SInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatRadioModule,
    NgApexchartsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ToastrModule.forRoot(),
    AgGridModule.withComponents([ChartBtnRendererComponent, BuyBtnRendererComponent, SellBtnRendererComponent])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents : [
    ChartModalComponent,
    TradeModalComponent
  ]
})

export class AppModule { }
