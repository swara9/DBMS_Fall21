import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { TradehistoryComponent } from './components/tradehistory/tradehistory.component';
import { ChartModalComponent } from './components/chart-modal/chart-modal.component';
import { SInfoComponent } from './components/sinfo/sinfo.component';
import { LoginComponent } from './components/login/login.component';
import { TradeModalComponent } from './components/trade-modal/trade-modal.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'sinfo/:symbol', component: SInfoComponent}, 
  { path: 'trade', component:TradeModalComponent },
  { path: 'chart', component:ChartModalComponent},
  { path: 'login', component:LoginComponent },
  { path: 'portfolio', component:PortfolioComponent },
  { path: 'tradehistory', component:TradehistoryComponent },
  { path: 'chart', component:ChartModalComponent},
  { path: 'trade', component:ChartModalComponent},
  { path: 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
