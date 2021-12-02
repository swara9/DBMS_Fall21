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
  allStocks : any;
  subscription: Subscription = new Subscription;
  stocksSubscription: Subscription = new Subscription;

  constructor(private profileService: ProfileService) { 
    this.frameworkComponents = {
      btnCellRenderer: BuyBtnRendererComponent,
      chartBtnRenderer: ChartBtnRendererComponent,
      sellBtnRenderer: SellBtnRendererComponent
    }
  }


  columnDefs=[
    {headerName:"Stock", field:"stock", headerClass:"sell", filter:true, cellStyle: {borderLeft:"solid 2px #1597E5"}},
    {headerName:"Net Profit & Loss", field:"net_profit_loss", headerClass:"sell"},
    
    {field:"buy",
    headerClass:"sell", 
    cellRenderer: "btnCellRenderer", width:200,
    cellRendererParams: {
      clicked: function(field: any) {
        //alert(`${field} was clicked`);
      }
    }},
    {field:"sell", width:200,
    headerClass:"sell", 
      cellRenderer: "sellBtnRenderer",  
      cellRendererParams: {
      clicked: function(field: any) {
      }
    }},

    {headerName:"Chart", field:"chart",  width:200, 
    cellRenderer: "chartBtnRenderer",  
    cellRendererParams: {
      clicked: function(field: any) {
      }
    },
    headerClass:"sell"}
  ];

  rowData=[
    {stock:'aapl', net_profit_loss:'111'},
    {stock:'jj', net_profit_loss:'1411'},

  ];
  rowStyle = { fontFamily:" sans-serif", textAlign:"center"};

  ngOnInit(): void {
    this.subscription = this.profileService.currentProfile.subscribe(
      profile => this.profile = profile
    )
    this.stocksSubscription = this.profileService.currAllStocks.subscribe(
      allStocks => this.allStocks = allStocks
    )
    console.log(this.profile.funds+" ===== "+this.profile.SSN)   
    console.log("All stocks " + this.allStocks[0].ISIN)
  }

  changeProfile(){
    this.profileService.changeProfile("12456987");
  }

}
