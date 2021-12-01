import { HighContrastModeDetector } from '@angular/cdk/a11y';
import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { BtnCellRenderer} from 'src/app/button-cell-renderer.component';
import { ChartBtnRenderer} from 'src/app/chart-btn-renderer.component';
import { SellBtnRenderer} from 'src/app/sell-btn-renderer.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PortfolioComponent implements OnInit {

  frameworkComponents: any;

  constructor() { 
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
      chartBtnRenderer: ChartBtnRenderer,
      sellBtnRenderer:SellBtnRenderer
    }
  }


  columnDefs=[
    {headerName:"Stock", field:"stock", headerClass:"h1", filter:true, cellStyle: {borderLeft:"solid 2px #1597E5"}},
    {headerName:"Net Profit & Loss", field:"net_profit_loss", headerClass:"h1"},
    
    {field:"buy",
    headerClass:"h1", 
    cellRenderer: "btnCellRenderer", width:100,
    cellRendererParams: {
      clicked: function(field: any) {
        //alert(`${field} was clicked`);
      }
    }},
    {field:"sell", width:100,
    headerClass:"h1", 
      cellRenderer: "sellBtnRenderer",  
      headerHeight:0,
      cellRendererParams: {
      clicked: function(field: any) {
      }
    }},

    {headerName:"Chart", field:"chart",  width:100, 
    cellRenderer: "chartBtnRenderer",  
    cellRendererParams: {
      clicked: function(field: any) {
      }
    },
    headerClass:"h1"}
  ];

  rowData=[
    {stock:'aapl', net_profit_loss:'111'},
    {stock:'jj', net_profit_loss:'1411'},

  ];
  


  ngOnInit(): void {
  }

}
