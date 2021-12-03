import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TradeModalComponent } from '../../trade-modal/trade-modal.component';
import { HttpService } from '../../../services/http-service.service';

@Component({
  selector: 'app-buy-btn-renderer',
  templateUrl: './buy-btn-renderer.component.html',
  styleUrls: ['./buy-btn-renderer.component.css']
})
export class BuyBtnRendererComponent implements ICellRendererAngularComp{
  private params: any;
  data: any;

  constructor(
    private dialog: MatDialog,
    private http: HttpService){ }

  agInit(params: any): void {
    this.params = params;
    this.data = params.data;
  }

  btnClickedHandler() {
    console.log(this.params)
  }

  openTradeDialog() {
    const dialogConfig = new MatDialogConfig();
    //should come from row
    // var isin = 'US0378331005';
    var symbol = this.data.stock;
    var cmp= this.data.cmp;
    var high= this.data.high;
    var low= this.data.low;
    var open= this.data.open;
    var close= this.data.close;
    var isin= this.data.isin;
     //var low = this.data.stock;
     // this.http.getStockHistory(isin)
     // .subscribe(history => {
       console.log(this.data.high)
       dialogConfig.autoFocus = true;
       dialogConfig.width = '1000px';
       dialogConfig.data = {
         isin: isin,
         symbol : symbol,
         cmp:cmp,
         open:open,
         close:close,
         high:high,
         low:low
      };      
      this.dialog.open(TradeModalComponent, dialogConfig);
    // });
  }

  refresh(params?: any): boolean {
      return true;
  }

}
