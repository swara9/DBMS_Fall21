import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tradehistory',
  templateUrl: './tradehistory.component.html',
  styleUrls: ['./tradehistory.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class TradehistoryComponent implements OnInit {
  
  columnDefs=[
    {headerName:"Trade ID", field:"tradeID", headerClass:"h1", filter:true, cellStyle: {borderLeft:"solid 2px #1597E5"}},
    {headerName:"Trade Date ", field:"trade_date", headerClass:"h1", filter:"agDateColumnFilter"},
    {headerName:"Quantity", field:"qty", headerClass:"h1", filter:"agNumberColumnFilter"},
    {headerName:"Price", field:"price", headerClass:"h1", filter:"agNumberColumnFilter"},

  ];

  rowData=[
    {tradeID:'M1C', trade_date:'A', qty:6, price:35000},
    {tradeID:'MC', trade_date:'B', qty:15, price:38000}
  ];
  
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
