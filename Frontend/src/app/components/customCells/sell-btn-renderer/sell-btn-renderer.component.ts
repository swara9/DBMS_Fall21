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
    const dialogConfig = new MatDialogConfig();
    //should come from row
    // var isin = 'US0378331005';
    var symbol = this.data.stock;
    // this.http.getStockHistory(isin)
    // .subscribe(history => {
      console.log(history)
      dialogConfig.autoFocus = true;
      dialogConfig.width = '1000px';
      dialogConfig.data = {
        // history : history,
        symbol : symbol
      };      
      this.dialog.open(TradeModalComponent, dialogConfig);
    // });
  }

  refresh(params?: any): boolean {
      return true;
  }
}