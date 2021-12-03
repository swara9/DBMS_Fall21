import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ChartBtnRendererComponent } from '../customCells/chart-btn-renderer/chart-btn-renderer.component';
import { BuyBtnRendererComponent } from '../customCells/buy-btn-renderer/buy-btn-renderer.component';
import { SellBtnRendererComponent } from '../customCells/sell-btn-renderer/sell-btn-renderer.component';
import { ProfileService } from "../../services/profile-service.service";
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http-service.service';

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
  portfolio: any;
  stocksPortfolio: any
  constructor(
    private profileService: ProfileService,
    private http: HttpService
    ) { 
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
      allStocks => {
        this.allStocks = allStocks
        console.log("All stocks " + this.allStocks[0].ISIN)
      }
    )

    this.http.getUserPortfolio(this.profile.SSN)
      .subscribe(portfolio =>  {
        this.portfolio = portfolio;
        this.stocksPortfolio = portfolio.portfolio
        console.log(this.portfolio.portfolio[0].symbol +"============"+this.portfolio.portfolio[3].currentValue)
    });

   // console.log(this.profile.funds+" ===== "+this.profile.SSN+"======"+this.profile.name)   
  }  

 rowData=[
    {stock:'aapl', qty:3, avg_price: 123, net_profit_loss:'111'},
    {stock:'jj',  qty:3, avg_price: 123, net_profit_loss:'1411'},

  ];

  columnDefs=[
    {headerName:"Stock", field:"symbol", headerClass:"sell", filter:true, cellStyle: {borderLeft:"solid 2px #1597E5"}},
    {headerName:"Quantity", field:"qty", headerClass:"sell"},
    {headerName:"Avg Price", field:"avg_price", headerClass:"sell"},
    {headerName:"Net Profit & Loss", field:"net_profit_loss", headerClass:"sell"},    
    {
      headerName:"Actions",
      field:"buy",
      headerClass:"sell", 
      cellRenderer: "sellBtnRenderer", 
      width:200
    },   
    {
      headerName:"Chart", 
      field:"chart",  
      width:200, 
      cellRenderer: "chartBtnRenderer",
      headerClass:"sell"
    }
  ];

  rowStyle = { fontFamily:" sans-serif", textAlign:"center"};

}
