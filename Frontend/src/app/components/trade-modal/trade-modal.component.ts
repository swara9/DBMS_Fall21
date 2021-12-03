import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../../services/http-service.service';
import { ProfileService } from "../../services/profile-service.service";
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-trade-modal',
  templateUrl: './trade-modal.component.html',
  styleUrls: ['./trade-modal.component.css']
})
export class TradeModalComponent implements OnInit {

  data:any;
  qty: number = 0;
  tradeType: string="";
  profile: any;
  allStocks : any = [];
  subscription: Subscription = new Subscription;
  stocksSubscription: Subscription = new Subscription;
  action : string = "";
  amt:number = 0;
  constructor(
    private dialogRef: MatDialogRef<TradeModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private http: HttpService,
    private profileService: ProfileService,
    private toastr: ToastrService
    ) { 
      this.data = data;
      console.log(data)
    }

  ngOnInit(): void {
    console.log("from trade modal "+ this.data.symbol)
    this.subscription = this.profileService.currentProfile.subscribe(
      profile => this.profile = profile
    )
    this.stocksSubscription = this.profileService.currAllStocks.subscribe(
      allStocks => this.allStocks = allStocks
    )


  }

  executeTrade(){
    this.makeTrade();
    this.toastr.success("Trade Excuted!");
    this.close();
    // this.updatePortfolio();
    // this.updateProfile();
  }

  //make entry in trade table
  makeTrade(){
    console.log("Execute Clicked");

    let trade = {
      "ISIN" : this.data.isin,
      "SSN" : this.profile.SSN,
      "qty": 10,
      "price" : this.data.cmp,
      "type": "buy"
    }
    console.log(trade)

    this.http.enterTrade(trade);
      

    //check if stock already there
      //if no then add to portfolio
      //else get stock from portfolio
      //update portfolio 
    //update profile
  }

  updatePortfolio(){
    let data = {
      "SSN": this.profile.SSN,
      "ISIN": this.data.isin
    }
    this.http.checkStockInPortfolio(data)
      .subscribe(res => {
        if(res.length == 0){
          //if not present
          let newEntry = {
            "ISIN": this.data.isin,
            "SSN": this.profile.SSN,
            "qty": 10,
            "avg_price": this.data.cmp
          }
          this.http.enterInPortfolio(newEntry);
        } else{
          // put in portfolio
          let oldQty = res.qty;
          let oldAvgPrice = res.avg_price;
          let newPrice = this.data.cmp;
          let newQty = 10;
          var totalQty;
          var avgPrice;
          if(this.action == "buy"){
            totalQty = oldQty + newQty; 
            avgPrice = ((oldAvgPrice*oldQty)+(newPrice*newQty))/totalQty;       
          } else{
            totalQty = oldQty - newQty;
            avgPrice = ((oldAvgPrice*oldQty)-(newPrice*newQty))/totalQty;
          }
          let data = {
            "ISIN": this.data.isin,
            "SSN": this.profile.SSN,
            "qty": totalQty,
            "avg_price": avgPrice
          }
          this.http.updatePortfolio(data);
        }
      });
  }

  updateProfile(){
    let newProfile = this.profile;
    newProfile.funds = this.profile.funds - this.amt;
    this.profileService.changeProfile(newProfile);
  }

  close() {
    console.log("Close called")
    this.makeTrade();
    this.toastr.success("Trade Excuted!");
    this.dialogRef.close();
  }
}
  