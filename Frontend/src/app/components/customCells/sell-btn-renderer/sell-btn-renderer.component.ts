import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TradeModalComponent } from '../../trade-modal/trade-modal.component';
import { HttpService } from '../../../services/http-service.service';

@Component({
  selector: 'app-sell-btn-renderer',
  templateUrl: './sell-btn-renderer.component.html',
  styleUrls: ['./sell-btn-renderer.component.css']
})
export class SellBtnRendererComponent implements ICellRendererAngularComp{
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
    console.log(this.params.data.symbol)
    this.http.getStockBySymbol(this.params.data.symbol)
      .subscribe(response =>{
        console.log("DATA "+ response[0][0])
        const dialogConfig = new MatDialogConfig();
        //should come from row
        // var isin = 'US0378331005';
        var symbol = response[0][1];
        var cmp= response[0][2];
        var high= response[0][5];
        var low= response[0][5];
        var open= response[0][3];
        var close= response[0][4];
        var isin= response[0][0];
        // this.http.getStockHistory(isin)
        // .subscribe(history => {
          console.log(this.data.high)
          dialogConfig.autoFocus = true;
          dialogConfig.width = '1000px';
          dialogConfig.data = {
            // history : history,
            isin: isin,
            symbol : symbol,
            cmp:cmp,
            open:open,
            close:close,
            high:high,
            low:low
          };      
          this.dialog.open(TradeModalComponent, dialogConfig);
      });
  }

  refresh(params?: any): boolean {
      return true;
  }
}