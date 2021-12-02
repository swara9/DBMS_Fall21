import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpService } from '../../services/http-service.service';
import {Router} from  '@angular/router';
import{StocksModule} from 'src/app/components/stocks/stocks.module';
import { ChartBtnRendererComponent } from '../customCells/chart-btn-renderer/chart-btn-renderer.component';
import { BuyBtnRendererComponent } from '../customCells/buy-btn-renderer/buy-btn-renderer.component';
import { SellBtnRendererComponent } from '../customCells/sell-btn-renderer/sell-btn-renderer.component';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class StocksComponent implements OnInit {
  stocks: StocksModule[]= [

    {id: 1, name:'Apple'},
    {id:2, name: 'Google'},
    {id:3, name: 'Tesla'},
    {id:4, name:'Microsoft'},
    {id:5, name: 'Tesla'},
    {id:6, name:'Amazon.com'},
    {id:7, name: 'Tesla'},
    {id:8, name:'JP Morgan'},
    {id:9, name: 'Walmart'},
    {id:10, name:'Bank Of America'},
    {id:11, name: 'Tesla'},
    {id:12, name:'Adobe'}
  
  ];
  Stocks:any;
  frameworkComponents: any;

  constructor(private dialog: MatDialog,
    private http: HttpService, private router: Router) { 
      this.frameworkComponents = {
        btnCellRenderer: BuyBtnRendererComponent,
        chartBtnRenderer: ChartBtnRendererComponent,
        sellBtnRenderer: SellBtnRendererComponent
      }
    }
    
  columnDefs=[

    {headerName:"Stock", field:"stock", headerClass:"head", filter:true},
    
    {headerName:"Current Market Price", 
    field:"cmp", 
    headerClass:"head"},

    {headerName:"High", 
    field:"high", 
    width:100,
    headerClass:"head"},

    {headerName:"Low", 
    field:"low", 
    width:100,
    headerClass:"head"},

    {headerName:"Buy", 
    field:"buy", 
    width:200,
    cellRenderer: "btnCellRenderer",
    cellRendererParams: {
      clicked: function(field: any) {
        //alert(`${field} was clicked`);
      }
    },
    headerClass:"head"},

    {headerName:"Sell", 
    field:"sell", 
    width:200,
    cellRenderer: "sellBtnRenderer",
    cellRendererParams: {
      clicked: function(field: any) {
        //alert(`${field} was clicked`);
      }
    },
    headerClass:"head"},

    {headerName:"View Chart", 
    field:"chart", 
    width:200,   
    cellRenderer: "chartBtnRenderer",  
    cellRendererParams: {
      clicked: function(field: any) {
      }
    },
    headerClass:"head"},
    
  ];

  rowData=[
    {stock:'aapl', net_profit_loss:'111',},
    {stock:'jj', net_profit_loss:'1411',},
  ];
  
  rowStyle = { fontFamily:" sans-serif", textAlign:"center"};


  ngOnInit(): void {
  }

}