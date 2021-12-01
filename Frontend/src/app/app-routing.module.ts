import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { StocksComponent } from './components/stocks/stocks.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TradehistoryComponent } from './components/tradehistory/tradehistory.component';
import { ChartModalComponent } from './components/chart-modal/chart-modal.component';
import { LoginComponent } from './components/login/login.component';
import { TradeModalComponent } from './components/trade-modal/trade-modal.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'pro', component:ProfileComponent},
  { path: 'portf', component:PortfolioComponent },
  { path: 'th', component:TradehistoryComponent },
  { path: 'trade', component:TradeComponent },
  { path: 'chart', component:ChartModalComponent},
  { path: 'login', component:LoginComponent },
  { path: 'profile', component:ProfileComponent},
  { path: 'portfolio', component:PortfolioComponent },
  { path: 'tradehistory', component:TradehistoryComponent },
  { path: 'chart', component:ChartModalComponent},
  { path: 'trade', component:ChartModalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
