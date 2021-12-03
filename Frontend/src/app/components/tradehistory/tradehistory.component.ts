import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from '../../services/http-service.service';
import { ProfileService } from "../../services/profile-service.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tradehistory',
  templateUrl: './tradehistory.component.html',
  styleUrls: ['./tradehistory.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class TradehistoryComponent implements OnInit {
  rowData =[];
  profile: any;
  allStocks : any = [];
  subscription: Subscription = new Subscription;
  stocksSubscription: Subscription = new Subscription;
  columnDefs=[
    {headerName:"Stock", field:"symbol", headerClass:"head", filter:true},
    {headerName:"Trade Date ", field:"trade_date", headerClass:"head", filter:"agDateColumnFilter"},
    {headerName:"Type", field:"type", headerClass:"head", filter:true},
    {headerName:"Quantity", field:"qty", headerClass:"head", filter:"agNumberColumnFilter"},
    {headerName:"Price", field:"price", headerClass:"head", filter:"agNumberColumnFilter", rowClass:"r1"},
    {headerName:"Amount", field:"amt", headerClass:"head", filter:"agNumberColumnFilter", rowClass:"r1"},

  ];

   
  rowStyle = { fontFamily:" sans-serif", textAlign:"center"};
  
  constructor(private http: HttpService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.subscription = this.profileService.currentProfile.subscribe(
      profile => this.profile = profile
    )
    this.stocksSubscription = this.profileService.currAllStocks.subscribe(
      allStocks => this.allStocks = allStocks
    )

    this.http.getTrade(this.profile.SSN)
      .subscribe(tradeList =>{           
          for(var entry of tradeList){
            entry.trade_date = entry.trade_date.substring(0,10);
          }
          this.rowData = tradeList;
      });
      
  }

}
