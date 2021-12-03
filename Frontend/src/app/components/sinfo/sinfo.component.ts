import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http-service.service';


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexTooltip,
  ApexLegend,
  ApexGrid,
  ApexStroke,
  ApexAnnotations
} from "ng-apexcharts";
import { SortController } from 'ag-grid-community';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;  
};

@Component({
  selector: 'app-sinfo',
  templateUrl: './sinfo.component.html',
  styleUrls: ['./sinfo.component.css']
})
export class SInfoComponent implements OnInit {

  @ViewChild("chart")
  chart: ChartComponent = new ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  symbol:any;
  history: any[]= [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.symbol = params.get('symbol');
      console.log(this.symbol)
    })

    var isin = 'US0378331005';
    var symbol = 'ABCD';
    this.http.getStockHistory(isin)
    .subscribe(history => {
      this.history = history
      this.initHistory(history);
      // console.log(history)
    });
  }    

  initHistory(historySeries: any[][]){
    console.log(historySeries[0][0].substring(0,10))
    console.log(historySeries.length+" LENGTH")
    for(var entry of historySeries){
      // console.log(entry[0])
      // let date = new Date(entry[0].substring(0,10));
      // console.log(date)
      let ohlc = [entry[1], entry[2], entry[3], entry[4]];
      let listObj = {
        // x: date,
        y: ohlc
      }      
      this.history.push(listObj);
      // console.log(this.history)
    }
  }



}
