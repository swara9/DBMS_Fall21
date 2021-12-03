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
  public allStocks : any;
  subscription: Subscription = new Subscription;
  stocksSubscription: Subscription = new Subscription;
  name: any;
  funds: any;
  inv: any;

  constructor(private profileService: ProfileService) { 
    this.frameworkComponents = {
      btnCellRenderer: BuyBtnRendererComponent,
      chartBtnRenderer: ChartBtnRendererComponent,
      sellBtnRenderer: SellBtnRendererComponent
    }
  }

  isin1:any;
  
  ngOnInit(): void {
    
    this.subscription = this.profileService.currentProfile.subscribe(
      profile => this.profile = profile
    )
    this.name=(this.profile.name);
    this.funds=(this.profile.funds);
    this.inv=(this.profile.totalInv);

    this.stocksSubscription = this.profileService.currAllStocks.subscribe(
      allStocks => this.allStocks = allStocks
    )
    //this.isin1 = this.allStocks[0].ISIN;

    console.log(this.profile.funds+" ===== "+this.profile.SSN+"======"+this.profile.name.toString())   
    console.log("All stocks " + this.allStocks[0].ISIN)
  }  

 rowData=[
    {stock:'aapl', net_profit_loss:'111'},
    {stock:'jj', net_profit_loss:'1411'},

  ];

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


  rowStyle = { fontFamily:" sans-serif", textAlign:"center"};


  //console.log(this.name);

  changeProfile(){
    this.profileService.changeProfile("12456987");
  }

}
