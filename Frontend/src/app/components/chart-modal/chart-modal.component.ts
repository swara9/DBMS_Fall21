import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;  
};

export type rsiChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  annotations: ApexAnnotations;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
}

export type adChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
}

export type obvChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
}

export type pcChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
}

export type macdChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.component.html',
  styleUrls: ['./chart-modal.component.css']
})

export class ChartModalComponent implements OnInit {
  @ViewChild("chart")
  chart: ChartComponent = new ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public rsiChartOptions: Partial<ChartOptions> | any;
  public macdChartOptions: Partial<ChartOptions> | any;
  public obvChartOptions: Partial<ChartOptions> | any;
  public adChartOptions: Partial<ChartOptions> | any;
  public pcChartOptions: Partial<ChartOptions> | any;

  selectedIndicator: string = '';
  showChart: boolean = true;
  isin: string = '';
  symbol: string = '';

  indicators: any[] = [
    {value: 'rsi', viewValue: 'Relative Strength Index'},
    {value: 'macd', viewValue: 'Moving Average Convergence Divergence'},
    {value: 'pg', viewValue: 'Percent Growth'},
    {value: 'obv', viewValue: 'On-balance Volume'},
    {value: 'ad', viewValue: 'Accumulation/Distribution Indicator'},
  ];

  history: any[]= [];

  constructor(
    private dialogRef: MatDialogRef<ChartModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private http: HttpService
    ) {       
      console.log("From chart modal "+data.histoy)
      this.initHistory(data.history);
      this.isin = data.isin;
      this.symbol = data.symbol;
      this.initCandleChart();
      this.initRSIChart();
      this.initMacdChart();
      this.initOBVChart();
      this.initADChart();
      this.initPCChart();
  }

  initHistory(historySeries: any[][]){
    for(var entry of historySeries){
      let date = new Date(entry[0].substring(0,10));
      let ohlc = [entry[1], entry[2], entry[3], entry[4]];
      let listObj = {
        x: date,
        y: ohlc
      }
      this.history.push(listObj);
    }
    console.log(this.history);
  }

  initCandleChart(): void {
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

  initMacdChart(){
    this.http.getMACD(this.isin)
    .subscribe(macdSeries => {
      let dates = [];
      let macdList = [];
      let signalList: any[] = [];
      for(var entry of macdSeries){      
        let date = new Date(entry[0].substring(0,10));
        let macd = entry[1];
        let signal = entry[2];
        dates.push(date);
        macdList.push([date,macd]);
        signalList.push([date,signal]);

      }     
      this.macdChartOptions = {
       
        series: [
          {
            name: "MACD",
            data: macdList
          },
          {
            name: "Signal",
            data: signalList
          }
        ],
        chart: {
          height: 500,
          type: "line"
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 5,
          curve: "straight"        
        },
        title: {
          text: "Moving Average Convergence Divergence",
          align: "left"
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          type:"datetime",
          labels: {
            trim: false
          }
          // categories: dates
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function(val: number) {
                  return val.toFixed(2);
                }
              }
            },
            {
              title: {
                formatter: function(val: number) {
                  return val;
                }
              }
            }
          ]
        },
        grid: {
          borderColor: "#f1f1f1"
        }
      };
    
    });    
  }

  ngOnInit(): void {
  }

  public initRSIChart(): void {
    this.http.getRSI(this.isin)
    .subscribe(rsiSeries => {
      console.log(rsiSeries);
      let rsiList: any[] = []
      let dates= []
      for(var entry of rsiSeries){
      
        let date = new Date(entry[0].substring(0,10));
        let rsi = entry[1];
        dates.push(date);
        rsiList.push([date, rsi]);
      }       
      this.rsiChartOptions = {
        series: [
          {
            name: this.symbol,
            data: rsiList
          }
        ],
        chart: {
          type: "area",
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: "zoom"
          }
        },
        annotations: {
          position: 'front',
          yaxis: [
            {
              y: 80,
              borderColor: "#00E396",
              label: {
                borderColor: "#00E396",
                style: {
                  color: "#fff",
                  background: "#00E396"
                },
                text: "80 - overbought"
              }
            },
            {
              y: 20,
              borderColor: "#775DD0",
              label: {
                borderColor: "#775DD0",
                style: {
                  color: "#fff",
                  background: "#775DD0"
                },
                text: "20 - underbought"
              }
            }
          ]
        },
        dataLabels:{
          enabled: false
        },
        markers : {
          size: 0 
        },
        title: {
          text: "Line Chart",
          align: "left"
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        yaxis: {
          label:{
            formatter: function(val: number) {
              return (val).toFixed(2);
            }
          },
          title: {
            text: "Price"
          }
        },
        xaxis: {
          type: "datetime"
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function(val: number) {
              return Number(val).toFixed(2);
            }
          }
        }  
      };
    });
  }
  
  public initOBVChart(): void {
    this.http.getOBV(this.isin)
    .subscribe(obvSeries => {
      console.log(obvSeries);
      let obvList: any[] = []
      let dates= []
      for(var entry of obvSeries){
      
        let date = new Date(entry[0].substring(0,10));
        let rsi = entry[1];
        dates.push(date);
        obvList.push([date, rsi]);
      }       
      this.obvChartOptions = {
        series: [
          {
            name: this.symbol,
            data: obvList
          }
        ],
        chart: {
          type: "area",
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: "zoom"
          }
        },
        dataLabels:{
          enabled: false
        },
        markers : {
          size: 0 
        },
        title: {
          text: "Line Chart",
          align: "left"
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        yaxis: {
          label:{
            formatter: function(val: number) {
              return (val).toFixed(2);
            }
          },
          title: {
            text: "Price"
          }
        },
        xaxis: {
          type: "datetime"
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function(val: number) {
              return Number(val).toFixed(2);
            }
          }
        }  
      };
    });
  }
  
  public initADChart(): void {
    this.http.getAD(this.isin)
    .subscribe(adSeries => {
      console.log(adSeries);
      let adList: any[] = []
      let dates= []
      for(var entry of adSeries){
      
        let date = new Date(entry[0].substring(0,10));
        let rsi = entry[1];
        dates.push(date);
        adList.push([date, rsi]);
      }       
      this.adChartOptions = {
        series: [
          {
            name: this.symbol,
            data: adList
          }
        ],
        chart: {
          type: "area",
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: "zoom"
          }
        },
        dataLabels:{
          enabled: false
        },
        markers : {
          size: 0 
        },
        title: {
          text: "Line Chart",
          align: "left"
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        yaxis: {
          label:{
            formatter: function(val: number) {
              return (val).toFixed(2);
            }
          },
          title: {
            text: "Price"
          }
        },
        xaxis: {
          type: "datetime"
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function(val: number) {
              return Number(val).toFixed(2);
            }
          }
        }  
      };
    });
  }
  
  public initPCChart(): void {
    this.http.getPercentChange(this.isin)
    .subscribe(pcSeries => {
      console.log(pcSeries);
      let pcList: any[] = []
      let dates= []
      for(var entry of pcSeries){
      
        let date = new Date(entry[0].substring(0,10));
        let rsi = entry[1];
        dates.push(date);
        pcList.push([date, rsi]);
      }       
      this.pcChartOptions = {
        series: [
          {
            name: this.symbol,
            data: pcList
          }
        ],
        chart: {
          type: "area",
          height: 350,
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: "zoom"
          }
        },
        dataLabels:{
          enabled: false
        },
        markers : {
          size: 0 
        },
        title: {
          text: "Line Chart",
          align: "left"
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        yaxis: {
          label:{
            formatter: function(val: number) {
              return (val).toFixed(2);
            }
          },
          title: {
            text: "Price"
          }
        },
        xaxis: {
          type: "datetime"
        },
        tooltip: {
          shared: false,
          y: {
            formatter: function(val: number) {
              return Number(val).toFixed(2);
            }
          }
        }  
      };
    });
  }
  

  close() {
    this.dialogRef.close();
  }
}

