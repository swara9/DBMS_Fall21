import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChartModalComponent } from '../../chart-modal/chart-modal.component';
import { HttpService } from '../../../services/http-service.service';
@Component({
  selector: 'app-chart-btn-renderer',
  templateUrl: './chart-btn-renderer.component.html',
  styleUrls: ['./chart-btn-renderer.component.css']
})
export class ChartBtnRendererComponent implements ICellRendererAngularComp {

  private params: any;

    constructor(
      private dialog: MatDialog,
      private http: HttpService){ }

    agInit(params: any): void {
      this.params = params;
    }
  
    openChartDialog() {
      const dialogConfig = new MatDialogConfig();
      //should come from row
      var isin = 'US0378331005';
      var symbol = 'ABCD';
      this.http.getStockHistory(isin)
      .subscribe(history => {
        console.log(history)
        dialogConfig.autoFocus = true;
        dialogConfig.width = '1000px';
        dialogConfig.data = {
          history : history,
          isin : isin,
          symbol : symbol
        };      
        this.dialog.open(ChartModalComponent, dialogConfig);
      });
    }

    refresh(params?: any): boolean {
        return true;
      }
}




  export class ChartBtnRenderer implements ICellRendererAngularComp{
  
    private params: any;

    constructor(
      private dialog: MatDialog,
      private http: HttpService){ }

    agInit(params: any): void {
      this.params = params;
    }
  
    // btnClickedHandler() {
      //this.params.clicked(this.params.value);
      // const navigationDetails: string[] = ['/chart'];
      // if(this.params.length) {
      //   navigationDetails.push(this.params);
      // }
      // this.router.navigate(navigationDetails);
    // }

    openChartDialog() {
      const dialogConfig = new MatDialogConfig();
      //should come from row
      var isin = 'US0378331005';
      var symbol = 'ABCD';
      this.http.getStockHistory(isin)
      .subscribe(history => {
        console.log(history)
        dialogConfig.autoFocus = true;
        dialogConfig.width = '1000px';
        dialogConfig.data = {
          history : history,
          isin : isin,
          symbol : symbol
        };      
        this.dialog.open(ChartModalComponent, dialogConfig);
      });
    }

    refresh(params?: any): boolean {
        return true;
      }
  }