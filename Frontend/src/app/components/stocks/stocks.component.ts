import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChartModalComponent } from '../chart-modal/chart-modal.component';
import { HttpService } from '../../services/http-service.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private http: HttpService) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    var isin = 'US0185811082';
    this.http.getStockHistory(isin)
    .subscribe(history => {
      console.log(history)
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        history : history
      };      
      this.dialog.open(ChartModalComponent, dialogConfig);
    });
    
    // dialogConfig.disableClose = true;
   
  }

}
