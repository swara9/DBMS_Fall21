import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tradehistory',
  templateUrl: './tradehistory.component.html',
  styleUrls: ['./tradehistory.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class TradehistoryComponent implements OnInit {
  
  columnDefs=[
    {headerName:"Trade ID", field:"tradeID", headerClass:"head", filter:true,  cellStyle: {borderLeft:"solid 2px #1597E5"}},
    {headerName:"Trade Date ", field:"trade_date", headerClass:"head", filter:"agDateColumnFilter"},
    {headerName:"Quantity", field:"qty", headerClass:"head", filter:"agNumberColumnFilter"},
    {headerName:"Price", field:"price", headerClass:"head", filter:"agNumberColumnFilter", rowClass:"r1"},

  ];

  rowData=[
    {tradeID:'M1C', trade_date:'A', qty:6, price:35000},
    {tradeID:'MC', trade_date:'B', qty:15, price:38000}
  ];
  
  rowStyle = { fontFamily:" sans-serif", textAlign:"center"};
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
