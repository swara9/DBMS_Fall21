import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChartModalComponent } from '../chart-modal/chart-modal.component';
import { HttpService } from '../../services/http-service.service';
import { BtnCellRenderer} from 'src/app/button-cell-renderer.component';
import { ChartBtnRenderer} from 'src/app/chart-btn-renderer.component';
import { SellBtnRenderer} from 'src/app/sell-btn-renderer.component';

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
        chartBtnRenderer: ChartBtnRenderer,
        sellBtnRenderer:SellBtnRenderer
      }
    }

    
  columnDefs=[

    {headerName:"Stock", field:"stock", headerClass:"h1", filter:true, cellStyle: {borderLeft:"solid 2px #1597E5"}},
    
    {headerName:"Buy", 
    field:"buy", 
    width:100,
    cellRenderer: "btnCellRenderer",
    cellRendererParams: {
      clicked: function(field: any) {
        //alert(`${field} was clicked`);
      }
    },
    headerClass:"h1"},

    {headerName:"Sell", 
    field:"sell", 
    width:100,
    cellRenderer: "sellBtnRenderer",
    cellRendererParams: {
      clicked: function(field: any) {
        //alert(`${field} was clicked`);
      }
    },
    headerClass:"h1"},

    {headerName:"Current Market Price", 
    field:"cmp", 
    headerClass:"h1"},

    {headerName:"High", 
    field:"high", 
    headerClass:"h1"},

    {headerName:"Low", 
    field:"low", 
    headerClass:"h1"},

    {headerName:"Chart", 
    field:"chart", 
    width:100,   
    cellRenderer: "chartBtnRenderer",  
    cellRendererParams: {
      clicked: function(field: any) {
      }
    }},
    
  ];

  rowData=[
    {stock:'aapl', net_profit_loss:'111',},
    {stock:'jj', net_profit_loss:'1411',},
  ];


  ngOnInit(): void {
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
    
    // dialogConfig.disableClose = true;
   
  }

}