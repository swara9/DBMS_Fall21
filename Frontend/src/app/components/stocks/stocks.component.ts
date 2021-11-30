import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChartModalComponent } from '../chart-modal/chart-modal.component';
import { HttpService } from '../../services/http-service.service';
import { BtnCellRenderer} from 'src/app/button-cell-renderer.component';
import { ChartBtnRenderer} from 'src/app/chart-btn-renderer.component';
@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class StocksComponent implements OnInit {
 
  frameworkComponents: any;

  constructor(private dialog: MatDialog,
    private http: HttpService) { 
      this.frameworkComponents = {
        btnCellRenderer: BtnCellRenderer,
        chartBtnRenderer: ChartBtnRenderer
      }
    }

    
  columnDefs=[
    {
      headerName:"Stock", 
      field:"stock", 
      headerClass:"h1", 
      filter:true
    },
    {
      headerName:"Buy/Sell", 
      field:"qty", 
      cellRenderer: "btnCellRenderer",
      cellRendererParams: {
        clicked: function(field: any) {
          //alert(`${field} was clicked`);
        }
      },
      headerClass:"h1"
    },
    {
      headerName:"Current Market Price", 
      field:"cmp", 
      headerClass:"h1"
    },
    {
      headerName:"High", 
      field:"high", 
      headerClass:"h1"
    },
    { 
      headerName:"Low", 
      field:"low", 
      headerClass:"h1"
    },
    {
      headerName:"Chart", 
      field:"chart",   
      cellRenderer: "chartBtnRenderer",  
      cellRendererParams: {
        clicked: function(field: any) {
        }
      },
      headerClass:"h1"
    }
  ];

  rowData=[
    {stock:'aapl', net_profit_loss:'111',},
    {stock:'jj', net_profit_loss:'1411',},
  ];


  ngOnInit(): void {
  }

  openDialog() {
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
    
    // dialogConfig.disableClose = true;
   
  }

}