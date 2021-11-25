import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChartModalComponent } from '../chart-modal/chart-modal.component';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message : "Hello!"
    };
    
    this.dialog.open(ChartModalComponent, dialogConfig);
  }
}
