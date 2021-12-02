import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ChartBtnRendererComponent } from '../customCells/chart-btn-renderer/chart-btn-renderer.component';
import { BuyBtnRendererComponent } from '../customCells/buy-btn-renderer/buy-btn-renderer.component';
import { SellBtnRendererComponent } from '../customCells/sell-btn-renderer/sell-btn-renderer.component';
import { ProfileService } from "../../services/profile-service.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PortfolioComponent implements OnInit {

  frameworkComponents: any;
  profile: any;
  subscription: Subscription = new Subscription;

  constructor(private profleService: ProfileService) { 
    this.frameworkComponents = {
      btnCellRenderer: BuyBtnRendererComponent,
      chartBtnRenderer: ChartBtnRendererComponent,
      sellBtnRenderer: SellBtnRendererComponent
    }
  }


  columnDefs=[
    {headerName:"Stock", field:"stock", headerClass:"h1", filter:true, cellStyle: {borderLeft:"solid 2px #1597E5"}},
    {headerName:"Net Profit & Loss", field:"net_profit_loss", headerClass:"h1"},
    
    {field:"buy",
    headerClass:"h1", 
    cellRenderer: "btnCellRenderer", width:100,
    cellRendererParams: {
      clicked: function(field: any) {
        //alert(`${field} was clicked`);
      }
    }},
    {field:"sell", width:100,
    headerClass:"h1", 
      cellRenderer: "sellBtnRenderer",  
      headerHeight:0,
      cellRendererParams: {
      clicked: function(field: any) {
      }
    }},

    {headerName:"Chart", field:"chart",  width:100, 
    cellRenderer: "chartBtnRenderer",  
    cellRendererParams: {
      clicked: function(field: any) {
      }
    },
    headerClass:"h1"}
  ];

  rowData=[
    {stock:'aapl', net_profit_loss:'111'},
    {stock:'jj', net_profit_loss:'1411'},

  ];

  ngOnInit(): void {
    this.subscription = this.profleService.currentProfile.subscribe(
      profile => this.profile = profile
    )
    this.changeProfile();
  }

  changeProfile(){
    this.profleService.changeProfile({'name': "profile has changed"});
  }

}
