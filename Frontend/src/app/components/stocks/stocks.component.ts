import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from '../../services/http-service.service';
import { Router} from  '@angular/router';
import { ChartBtnRendererComponent } from '../customCells/chart-btn-renderer/chart-btn-renderer.component';
import { BuyBtnRendererComponent } from '../customCells/buy-btn-renderer/buy-btn-renderer.component';
import { SellBtnRendererComponent } from '../customCells/sell-btn-renderer/sell-btn-renderer.component';
import { ProfileService } from "../../services/profile-service.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class StocksComponent implements OnInit {

  selectedStock: string = '';
  topStocks: any = [];
  frameworkComponents: any;
  profile: any;
  allStocks : any = [];
  subscription: Subscription = new Subscription;
  stocksSubscription: Subscription = new Subscription;

  constructor(
    private http: HttpService, 
    private router: Router,
    private profileService: ProfileService
    ) { 
      this.frameworkComponents = {
        btnCellRenderer: BuyBtnRendererComponent,
        chartBtnRenderer: ChartBtnRendererComponent,
        sellBtnRenderer: SellBtnRendererComponent
      }
    }
    
    columnDefs=[

      {headerName:"Stock", field:"stockName",width:80, headerClass:"head", filter:true},      
      {headerName:"Symbol", field:"symbol",width:80, headerClass:"head", filter:true},      
      {headerName:"Current Market Price", 
      field:"cmp", 
      headerClass:"head"},
      {headerName:"Open", field:"open",width:80 ,headerClass:"head", filter:true},
      {headerName:"Close", field:"close",width:80, headerClass:"head", filter:true},
      {headerName:"High", 
      field:"high", 
      width:80,
      headerClass:"head"},
  
      {headerName:"Low", 
      field:"low", 
      width:80,
      headerClass:"head"},
  
    {
      headerName:"Actions", 
      field:"buy", 
      width:200,
      cellRenderer: "btnCellRenderer",
      headerClass:"head"},

    {headerName:"View Chart", 
    field:"chart", 
    width:200,   
    cellRenderer: "chartBtnRenderer",  
    cellRendererParams: {
      clicked: function(field: any) {
      }
    },
    headerClass:"head"},
    
  ];

  rowData=[
    {stock:'aapl', net_profit_loss:'111',},
    {stock:'jj', net_profit_loss:'1411',},
  ];
  
    
  rowStyle = { fontFamily:" sans-serif", textAlign:"center"};


  ngOnInit(): void {
    this.subscription = this.profileService.currentProfile.subscribe(
      profile => this.profile = profile
    )
    this.stocksSubscription = this.profileService.currAllStocks.subscribe(
      allStocks => this.allStocks = allStocks
    )

    this.http.getTopStocks()
      .subscribe(topStocks => {
        this.topStocks = topStocks
        console.log(this.topStocks)
      });

    console.log(this.allStocks[0])
  }

  goToStock(){
    this.router.navigate(['/sinfo/'+this.selectedStock]);
  }

}