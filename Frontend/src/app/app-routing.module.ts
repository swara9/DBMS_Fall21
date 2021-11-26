import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { TradehistoryComponent } from './components/tradehistory/tradehistory.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pro', component:ProfileComponent},
  { path: 'portf', component:PortfolioComponent },
  { path: 'th', component:TradehistoryComponent },
  { path: 'st', component:StocksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
