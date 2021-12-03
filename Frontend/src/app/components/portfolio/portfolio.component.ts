import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ChartBtnRendererComponent } from '../customCells/chart-btn-renderer/chart-btn-renderer.component';
import { BuyBtnRendererComponent } from '../customCells/buy-btn-renderer/buy-btn-renderer.component';
import { SellBtnRendererComponent } from '../customCells/sell-btn-renderer/sell-btn-renderer.component';
import { ProfileService } from "../../services/profile-service.service";
import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http-service.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class PortfolioComponent implements OnInit {

  numRows!: number;
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
    private http: HttpService,
    private toastr: ToastrService
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

  columnDefs=[
    {headerName:"Stock", field:"symbol", headerClass:"sell", filter:true, width:200},
    {headerName:"Quantity", field:"qty", headerClass:"sell" , width:200},
    {headerName:"Avg Price", field:"avg_price", headerClass:"sell", width:200},
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

  getNumberOfRows(){
    this.http.getTotalTuples()
      .subscribe(tuples => {
        this.numRows = tuples;
        console.log("rows = "+this.numRows)
        this.toastr.info("Total Rows = "+ this.numRows)
      });
  }
  rowStyle = { fontFamily:" sans-serif", textAlign:"center"};

}
