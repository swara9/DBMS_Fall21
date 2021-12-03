import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../services/http-service.service';


import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

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
  cmp: any;
  open: any;
  close: any;
  high: any;
  low: any;
  
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
      this.initSeries(history)
      // console.log(this.history)
      this.initChartOptions()
    });
  }    

  initSeries(history:any){
      for(var entry of history){
        let date = new Date(entry[0].substring(0,10))
        let ohlc = [entry[1], entry[2], entry[3], entry[4]];
        let listObj = {
          x: date,
          y: ohlc
        }      
        this.history.push(listObj)
      }
  }

  initChartOptions(){
    this.chartOptions = {
      series: [
        {
          name: "candle",
          data: this.history
        }
      ],
      chart: {
        type: "candlestick",
        height: 350
      },
      title: {
        text: "CandleStick Chart",
        align: "left"
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return value.toFixed(2);
          }
        },
        title: {
          text: "Price"
        },
      
        tooltip: {
          enabled: true
        }      
      }
    };
  }
}
