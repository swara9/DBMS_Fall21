import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;  
};

export type lineChartOptions = {
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

@Component({
  selector: 'app-chart-modal',
  templateUrl: './chart-modal.component.html',
  styleUrls: ['./chart-modal.component.css']
})

export class ChartModalComponent implements OnInit {
  @ViewChild("chart")
  chart: ChartComponent = new ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public lineChartOptions: Partial<ChartOptions> | any;
  history: any[]= [];
  dataSeries = [
    [
    {
      date: "2014-01-01",
      value: 20000000
    },
    {
      date: "2014-01-02",
      value: 10379978
    },
    {
      date: "2014-01-03",
      value: 30493749
    },
    {
      date: "2014-01-04",
      value: 10785250
    },
    {
      date: "2014-01-05",
      value: 33901904
    },
    {
      date: "2014-01-06",
      value: 11576838
    },
    {
      date: "2014-01-07",
      value: 14413854
    },
    {
      date: "2014-01-08",
      value: 15177211
    },
    {
      date: "2014-01-09",
      value: 16622100
    },
    {
      date: "2014-01-10",
      value: 17381072
    },
    {
      date: "2014-01-11",
      value: 18802310
    },
    {
      date: "2014-01-12",
      value: 15531790
    },
    {
      date: "2014-01-13",
      value: 15748881
    },
    {
      date: "2014-01-14",
      value: 18706437
    },
    {
      date: "2014-01-15",
      value: 19752685
    },
    {
      date: "2014-01-16",
      value: 21016418
    },
    {
      date: "2014-01-17",
      value: 25622924
    },
    {
      date: "2014-01-18",
      value: 25337480
    },
    {
      date: "2014-01-19",
      value: 22258882
    },
    {
      date: "2014-01-20",
      value: 23829538
    },
    {
      date: "2014-01-21",
      value: 24245689
    },
    {
      date: "2014-01-22",
      value: 26429711
    },
    {
      date: "2014-01-23",
      value: 26259017
    },
    {
      date: "2014-01-24",
      value: 25396183
    },
    {
      date: "2014-01-25",
      value: 23107346
    },
    {
      date: "2014-01-26",
      value: 28659852
    },
    {
      date: "2014-01-27",
      value: 25270783
    },
    {
      date: "2014-01-28",
      value: 26270783
    },
    {
      date: "2014-01-29",
      value: 27270783
    },
    {
      date: "2014-01-30",
      value: 28270783
    },
    {
      date: "2014-01-31",
      value: 29270783
    },
    {
      date: "2014-02-01",
      value: 30270783
    },
    {
      date: "2014-02-02",
      value: 31270783
    },
    {
      date: "2014-02-03",
      value: 32270783
    },
    {
      date: "2014-02-04",
      value: 33270783
    },
    {
      date: "2014-02-05",
      value: 28270783
    },
    {
      date: "2014-02-06",
      value: 27270783
    },
    {
      date: "2014-02-07",
      value: 35270783
    },
    {
      date: "2014-02-08",
      value: 34270783
    },
    {
      date: "2014-02-09",
      value: 28270783
    },
    {
      date: "2014-02-10",
      value: 35270783
    },
    {
      date: "2014-02-11",
      value: 36270783
    },
    {
      date: "2014-02-12",
      value: 34127078
    },
    {
      date: "2014-02-13",
      value: 33124078
    },
    {
      date: "2014-02-14",
      value: 36227078
    },
    {
      date: "2014-02-15",
      value: 37827078
    },
    {
      date: "2014-02-16",
      value: 36427073
    },
    {
      date: "2014-02-17",
      value: 37570783
    },
    {
      date: "2014-02-18",
      value: 38627073
    },
    {
      date: "2014-02-19",
      value: 37727078
    },
    {
      date: "2014-02-20",
      value: 38827073
    },
    {
      date: "2014-02-21",
      value: 40927078
    },
    {
      date: "2014-02-22",
      value: 41027078
    },
    {
      date: "2014-02-23",
      value: 42127073
    },
    {
      date: "2014-02-24",
      value: 43220783
    },
    {
      date: "2014-02-25",
      value: 44327078
    },
    {
      date: "2014-02-26",
      value: 40427078
    },
    {
      date: "2014-02-27",
      value: 41027078
    },
    {
      date: "2014-02-28",
      value: 45627078
    },
    {
      date: "2014-03-01",
      value: 44727078
    },
    {
      date: "2014-03-02",
      value: 44227078
    },
    {
      date: "2014-03-03",
      value: 45227078
    },
    {
      date: "2014-03-04",
      value: 46027078
    },
    {
      date: "2014-03-05",
      value: 46927078
    },
    {
      date: "2014-03-06",
      value: 47027078
    },
    {
      date: "2014-03-07",
      value: 46227078
    },
    {
      date: "2014-03-08",
      value: 47027078
    },
    {
      date: "2014-03-09",
      value: 48027078
    },
    {
      date: "2014-03-10",
      value: 47027078
    },
    {
      date: "2014-03-11",
      value: 47027078
    },
    {
      date: "2014-03-12",
      value: 48017078
    },
    {
      date: "2014-03-13",
      value: 48077078
    },
    {
      date: "2014-03-14",
      value: 48087078
    },
    {
      date: "2014-03-15",
      value: 48017078
    },
    {
      date: "2014-03-16",
      value: 48047078
    },
    {
      date: "2014-03-17",
      value: 48067078
    },
    {
      date: "2014-03-18",
      value: 48077078
    },
    {
      date: "2014-03-19",
      value: 48027074
    },
    {
      date: "2014-03-20",
      value: 48927079
    },
    {
      date: "2014-03-21",
      value: 48727071
    },
    {
      date: "2014-03-22",
      value: 48127072
    },
    {
      date: "2014-03-23",
      value: 48527072
    },
    {
      date: "2014-03-24",
      value: 48627027
    },
    {
      date: "2014-03-25",
      value: 48027040
    },
    {
      date: "2014-03-26",
      value: 48027043
    },
    {
      date: "2014-03-27",
      value: 48057022
    },
    {
      date: "2014-03-28",
      value: 49057022
    },
    {
      date: "2014-03-29",
      value: 50057022
    },
    {
      date: "2014-03-30",
      value: 51057022
    },
    {
      date: "2014-03-31",
      value: 52057022
    },
    {
      date: "2014-04-01",
      value: 53057022
    },
    {
      date: "2014-04-02",
      value: 54057022
    },
    {
      date: "2014-04-03",
      value: 52057022
    },
    {
      date: "2014-04-04",
      value: 55057022
    },
    {
      date: "2014-04-05",
      value: 58270783
    },
    {
      date: "2014-04-06",
      value: 56270783
    },
    {
      date: "2014-04-07",
      value: 55270783
    },
    {
      date: "2014-04-08",
      value: 58270783
    },
    {
      date: "2014-04-09",
      value: 59270783
    },
    {
      date: "2014-04-10",
      value: 60270783
    },
    {
      date: "2014-04-11",
      value: 61270783
    },
    {
      date: "2014-04-12",
      value: 62270783
    },
    {
      date: "2014-04-13",
      value: 63270783
    },
    {
      date: "2014-04-14",
      value: 64270783
    },
    {
      date: "2014-04-15",
      value: 65270783
    },
    {
      date: "2014-04-16",
      value: 66270783
    },
    {
      date: "2014-04-17",
      value: 67270783
    },
    {
      date: "2014-04-18",
      value: 68270783
    },
    {
      date: "2014-04-19",
      value: 69270783
    },
    {
      date: "2014-04-20",
      value: 70270783
    },
    {
      date: "2014-04-21",
      value: 71270783
    },
    {
      date: "2014-04-22",
      value: 72270783
    },
    {
      date: "2014-04-23",
      value: 73270783
    },
    {
      date: "2014-04-24",
      value: 74270783
    },
    {
      date: "2014-04-25",
      value: 75270783
    },
    {
      date: "2014-04-26",
      value: 76660783
    },
    {
      date: "2014-04-27",
      value: 77270783
    },
    {
      date: "2014-04-28",
      value: 78370783
    },
    {
      date: "2014-04-29",
      value: 79470783
    },
    {
      date: "2014-04-30",
      value: 80170783
    }
  ],
  [
    {
      date: "2014-01-01",
      value: 150000000
    },
    {
      date: "2014-01-02",
      value: 160379978
    },
    {
      date: "2014-01-03",
      value: 170493749
    },
    {
      date: "2014-01-04",
      value: 160785250
    },
    {
      date: "2014-01-05",
      value: 167391904
    },
    {
      date: "2014-01-06",
      value: 161576838
    },
    {
      date: "2014-01-07",
      value: 161413854
    },
    {
      date: "2014-01-08",
      value: 152177211
    },
    {
      date: "2014-01-09",
      value: 140762210
    },
    {
      date: "2014-01-10",
      value: 144381072
    },
    {
      date: "2014-01-11",
      value: 154352310
    },
    {
      date: "2014-01-12",
      value: 165531790
    },
    {
      date: "2014-01-13",
      value: 175748881
    },
    {
      date: "2014-01-14",
      value: 187064037
    },
    {
      date: "2014-01-15",
      value: 197520685
    },
    {
      date: "2014-01-16",
      value: 210176418
    },
    {
      date: "2014-01-17",
      value: 196122924
    },
    {
      date: "2014-01-18",
      value: 207337480
    },
    {
      date: "2014-01-19",
      value: 200258882
    },
    {
      date: "2014-01-20",
      value: 186829538
    },
    {
      date: "2014-01-21",
      value: 192456897
    },
    {
      date: "2014-01-22",
      value: 204299711
    },
    {
      date: "2014-01-23",
      value: 192759017
    },
    {
      date: "2014-01-24",
      value: 203596183
    },
    {
      date: "2014-01-25",
      value: 208107346
    },
    {
      date: "2014-01-26",
      value: 196359852
    },
    {
      date: "2014-01-27",
      value: 192570783
    },
    {
      date: "2014-01-28",
      value: 177967768
    },
    {
      date: "2014-01-29",
      value: 190632803
    },
    {
      date: "2014-01-30",
      value: 203725316
    },
    {
      date: "2014-01-31",
      value: 218226177
    },
    {
      date: "2014-02-01",
      value: 210698669
    },
    {
      date: "2014-02-02",
      value: 217640656
    },
    {
      date: "2014-02-03",
      value: 216142362
    },
    {
      date: "2014-02-04",
      value: 201410971
    },
    {
      date: "2014-02-05",
      value: 196704289
    },
    {
      date: "2014-02-06",
      value: 190436945
    },
    {
      date: "2014-02-07",
      value: 178891686
    },
    {
      date: "2014-02-08",
      value: 171613962
    },
    {
      date: "2014-02-09",
      value: 157579773
    },
    {
      date: "2014-02-10",
      value: 158677098
    },
    {
      date: "2014-02-11",
      value: 147129977
    },
    {
      date: "2014-02-12",
      value: 151561876
    },
    {
      date: "2014-02-13",
      value: 151627421
    },
    {
      date: "2014-02-14",
      value: 143543872
    },
    {
      date: "2014-02-15",
      value: 136581057
    },
    {
      date: "2014-02-16",
      value: 135560715
    },
    {
      date: "2014-02-17",
      value: 122625263
    },
    {
      date: "2014-02-18",
      value: 112091484
    },
    {
      date: "2014-02-19",
      value: 98810329
    },
    {
      date: "2014-02-20",
      value: 99882912
    },
    {
      date: "2014-02-21",
      value: 94943095
    },
    {
      date: "2014-02-22",
      value: 104875743
    },
    {
      date: "2014-02-23",
      value: 116383678
    },
    {
      date: "2014-02-24",
      value: 125028841
    },
    {
      date: "2014-02-25",
      value: 123967310
    },
    {
      date: "2014-02-26",
      value: 133167029
    },
    {
      date: "2014-02-27",
      value: 128577263
    },
    {
      date: "2014-02-28",
      value: 115836969
    },
    {
      date: "2014-03-01",
      value: 119264529
    },
    {
      date: "2014-03-02",
      value: 109363374
    },
    {
      date: "2014-03-03",
      value: 113985628
    },
    {
      date: "2014-03-04",
      value: 114650999
    },
    {
      date: "2014-03-05",
      value: 110866108
    },
    {
      date: "2014-03-06",
      value: 96473454
    },
    {
      date: "2014-03-07",
      value: 104075886
    },
    {
      date: "2014-03-08",
      value: 103568384
    },
    {
      date: "2014-03-09",
      value: 101534883
    },
    {
      date: "2014-03-10",
      value: 115825447
    },
    {
      date: "2014-03-11",
      value: 126133916
    },
    {
      date: "2014-03-12",
      value: 116502109
    },
    {
      date: "2014-03-13",
      value: 130169411
    },
    {
      date: "2014-03-14",
      value: 124296886
    },
    {
      date: "2014-03-15",
      value: 126347399
    },
    {
      date: "2014-03-16",
      value: 131483669
    },
    {
      date: "2014-03-17",
      value: 142811333
    },
    {
      date: "2014-03-18",
      value: 129675396
    },
    {
      date: "2014-03-19",
      value: 115514483
    },
    {
      date: "2014-03-20",
      value: 117630630
    },
    {
      date: "2014-03-21",
      value: 122340239
    },
    {
      date: "2014-03-22",
      value: 132349091
    },
    {
      date: "2014-03-23",
      value: 125613305
    },
    {
      date: "2014-03-24",
      value: 135592466
    },
    {
      date: "2014-03-25",
      value: 123408762
    },
    {
      date: "2014-03-26",
      value: 111991454
    },
    {
      date: "2014-03-27",
      value: 116123955
    },
    {
      date: "2014-03-28",
      value: 112817214
    },
    {
      date: "2014-03-29",
      value: 113029590
    },
    {
      date: "2014-03-30",
      value: 108753398
    },
    {
      date: "2014-03-31",
      value: 99383763
    },
    {
      date: "2014-04-01",
      value: 100151737
    },
    {
      date: "2014-04-02",
      value: 94985209
    },
    {
      date: "2014-04-03",
      value: 82913669
    },
    {
      date: "2014-04-04",
      value: 78748268
    },
    {
      date: "2014-04-05",
      value: 63829135
    },
    {
      date: "2014-04-06",
      value: 78694727
    },
    {
      date: "2014-04-07",
      value: 80868994
    },
    {
      date: "2014-04-08",
      value: 93799013
    },
    {
      date: "2014-04-09",
      value: 99042416
    },
    {
      date: "2014-04-10",
      value: 97298692
    },
    {
      date: "2014-04-11",
      value: 83353499
    },
    {
      date: "2014-04-12",
      value: 71248129
    },
    {
      date: "2014-04-13",
      value: 75253744
    },
    {
      date: "2014-04-14",
      value: 68976648
    },
    {
      date: "2014-04-15",
      value: 71002284
    },
    {
      date: "2014-04-16",
      value: 75052401
    },
    {
      date: "2014-04-17",
      value: 83894030
    },
    {
      date: "2014-04-18",
      value: 90236528
    },
    {
      date: "2014-04-19",
      value: 99739114
    },
    {
      date: "2014-04-20",
      value: 96407136
    },
    {
      date: "2014-04-21",
      value: 108323177
    },
    {
      date: "2014-04-22",
      value: 101578914
    },
    {
      date: "2014-04-23",
      value: 115877608
    },
    {
      date: "2014-04-24",
      value: 112088857
    },
    {
      date: "2014-04-25",
      value: 112071353
    },
    {
      date: "2014-04-26",
      value: 101790062
    },
    {
      date: "2014-04-27",
      value: 115003761
    },
    {
      date: "2014-04-28",
      value: 120457727
    },
    {
      date: "2014-04-29",
      value: 118253926
    },
    {
      date: "2014-04-30",
      value: 117956992
    }
  ],
  [
    {
      date: "2014-01-01",
      value: 50000000
    },
    {
      date: "2014-01-02",
      value: 60379978
    },
    {
      date: "2014-01-03",
      value: 40493749
    },
    {
      date: "2014-01-04",
      value: 60785250
    },
    {
      date: "2014-01-05",
      value: 67391904
    },
    {
      date: "2014-01-06",
      value: 61576838
    },
    {
      date: "2014-01-07",
      value: 61413854
    },
    {
      date: "2014-01-08",
      value: 82177211
    },
    {
      date: "2014-01-09",
      value: 103762210
    },
    {
      date: "2014-01-10",
      value: 84381072
    },
    {
      date: "2014-01-11",
      value: 54352310
    },
    {
      date: "2014-01-12",
      value: 65531790
    },
    {
      date: "2014-01-13",
      value: 75748881
    },
    {
      date: "2014-01-14",
      value: 47064037
    },
    {
      date: "2014-01-15",
      value: 67520685
    },
    {
      date: "2014-01-16",
      value: 60176418
    },
    {
      date: "2014-01-17",
      value: 66122924
    },
    {
      date: "2014-01-18",
      value: 57337480
    },
    {
      date: "2014-01-19",
      value: 100258882
    },
    {
      date: "2014-01-20",
      value: 46829538
    },
    {
      date: "2014-01-21",
      value: 92456897
    },
    {
      date: "2014-01-22",
      value: 94299711
    },
    {
      date: "2014-01-23",
      value: 62759017
    },
    {
      date: "2014-01-24",
      value: 103596183
    },
    {
      date: "2014-01-25",
      value: 108107346
    },
    {
      date: "2014-01-26",
      value: 66359852
    },
    {
      date: "2014-01-27",
      value: 62570783
    },
    {
      date: "2014-01-28",
      value: 77967768
    },
    {
      date: "2014-01-29",
      value: 60632803
    },
    {
      date: "2014-01-30",
      value: 103725316
    },
    {
      date: "2014-01-31",
      value: 98226177
    },
    {
      date: "2014-02-01",
      value: 60698669
    },
    {
      date: "2014-02-02",
      value: 67640656
    },
    {
      date: "2014-02-03",
      value: 66142362
    },
    {
      date: "2014-02-04",
      value: 101410971
    },
    {
      date: "2014-02-05",
      value: 66704289
    },
    {
      date: "2014-02-06",
      value: 60436945
    },
    {
      date: "2014-02-07",
      value: 78891686
    },
    {
      date: "2014-02-08",
      value: 71613962
    },
    {
      date: "2014-02-09",
      value: 107579773
    },
    {
      date: "2014-02-10",
      value: 58677098
    },
    {
      date: "2014-02-11",
      value: 87129977
    },
    {
      date: "2014-02-12",
      value: 51561876
    },
    {
      date: "2014-02-13",
      value: 51627421
    },
    {
      date: "2014-02-14",
      value: 83543872
    },
    {
      date: "2014-02-15",
      value: 66581057
    },
    {
      date: "2014-02-16",
      value: 65560715
    },
    {
      date: "2014-02-17",
      value: 62625263
    },
    {
      date: "2014-02-18",
      value: 92091484
    },
    {
      date: "2014-02-19",
      value: 48810329
    },
    {
      date: "2014-02-20",
      value: 49882912
    },
    {
      date: "2014-02-21",
      value: 44943095
    },
    {
      date: "2014-02-22",
      value: 104875743
    },
    {
      date: "2014-02-23",
      value: 96383678
    },
    {
      date: "2014-02-24",
      value: 105028841
    },
    {
      date: "2014-02-25",
      value: 63967310
    },
    {
      date: "2014-02-26",
      value: 63167029
    },
    {
      date: "2014-02-27",
      value: 68577263
    },
    {
      date: "2014-02-28",
      value: 95836969
    },
    {
      date: "2014-03-01",
      value: 99264529
    },
    {
      date: "2014-03-02",
      value: 109363374
    },
    {
      date: "2014-03-03",
      value: 93985628
    },
    {
      date: "2014-03-04",
      value: 94650999
    },
    {
      date: "2014-03-05",
      value: 90866108
    },
    {
      date: "2014-03-06",
      value: 46473454
    },
    {
      date: "2014-03-07",
      value: 84075886
    },
    {
      date: "2014-03-08",
      value: 103568384
    },
    {
      date: "2014-03-09",
      value: 101534883
    },
    {
      date: "2014-03-10",
      value: 95825447
    },
    {
      date: "2014-03-11",
      value: 66133916
    },
    {
      date: "2014-03-12",
      value: 96502109
    },
    {
      date: "2014-03-13",
      value: 80169411
    },
    {
      date: "2014-03-14",
      value: 84296886
    },
    {
      date: "2014-03-15",
      value: 86347399
    },
    {
      date: "2014-03-16",
      value: 31483669
    },
    {
      date: "2014-03-17",
      value: 82811333
    },
    {
      date: "2014-03-18",
      value: 89675396
    },
    {
      date: "2014-03-19",
      value: 95514483
    },
    {
      date: "2014-03-20",
      value: 97630630
    },
    {
      date: "2014-03-21",
      value: 62340239
    },
    {
      date: "2014-03-22",
      value: 62349091
    },
    {
      date: "2014-03-23",
      value: 65613305
    },
    {
      date: "2014-03-24",
      value: 65592466
    },
    {
      date: "2014-03-25",
      value: 63408762
    },
    {
      date: "2014-03-26",
      value: 91991454
    },
    {
      date: "2014-03-27",
      value: 96123955
    },
    {
      date: "2014-03-28",
      value: 92817214
    },
    {
      date: "2014-03-29",
      value: 93029590
    },
    {
      date: "2014-03-30",
      value: 108753398
    },
    {
      date: "2014-03-31",
      value: 49383763
    },
    {
      date: "2014-04-01",
      value: 100151737
    },
    {
      date: "2014-04-02",
      value: 44985209
    },
    {
      date: "2014-04-03",
      value: 52913669
    },
    {
      date: "2014-04-04",
      value: 48748268
    },
    {
      date: "2014-04-05",
      value: 23829135
    },
    {
      date: "2014-04-06",
      value: 58694727
    },
    {
      date: "2014-04-07",
      value: 50868994
    },
    {
      date: "2014-04-08",
      value: 43799013
    },
    {
      date: "2014-04-09",
      value: 4042416
    },
    {
      date: "2014-04-10",
      value: 47298692
    },
    {
      date: "2014-04-11",
      value: 53353499
    },
    {
      date: "2014-04-12",
      value: 71248129
    },
    {
      date: "2014-04-13",
      value: 75253744
    },
    {
      date: "2014-04-14",
      value: 68976648
    },
    {
      date: "2014-04-15",
      value: 71002284
    },
    {
      date: "2014-04-16",
      value: 75052401
    },
    {
      date: "2014-04-17",
      value: 83894030
    },
    {
      date: "2014-04-18",
      value: 50236528
    },
    {
      date: "2014-04-19",
      value: 59739114
    },
    {
      date: "2014-04-20",
      value: 56407136
    },
    {
      date: "2014-04-21",
      value: 108323177
    },
    {
      date: "2014-04-22",
      value: 101578914
    },
    {
      date: "2014-04-23",
      value: 95877608
    },
    {
      date: "2014-04-24",
      value: 62088857
    },
    {
      date: "2014-04-25",
      value: 92071353
    },
    {
      date: "2014-04-26",
      value: 81790062
    },
    {
      date: "2014-04-27",
      value: 105003761
    },
    {
      date: "2014-04-28",
      value: 100457727
    },
    {
      date: "2014-04-29",
      value: 98253926
    },
    {
      date: "2014-04-30",
      value: 67956992
    }
    ]
  ];
  list = [
    {
      x: new Date(1538778600000),
      y: [6629.81, 6650.5, 6623.04, 6633.33]
    },
    {
      x: new Date(1538780400000),
      y: [6632.01, 6643.59, 6620, 6630.11]
    },
    {
      x: new Date(1538782200000),
      y: [6630.71, 6648.95, 6623.34, 6635.65]
    },
    {
      x: new Date(1538784000000),
      y: [6635.65, 6651, 6629.67, 6638.24]
    },
    {
      x: new Date(1538785800000),
      y: [6638.24, 6640, 6620, 6624.47]
    },
    {
      x: new Date(1538787600000),
      y: [6624.53, 6636.03, 6621.68, 6624.31]
    },
    {
      x: new Date(1538789400000),
      y: [6624.61, 6632.2, 6617, 6626.02]
    },
    {
      x: new Date(1538791200000),
      y: [6627, 6627.62, 6584.22, 6603.02]
    },
    {
      x: new Date(1538793000000),
      y: [6605, 6608.03, 6598.95, 6604.01]
    },
    {
      x: new Date(1538794800000),
      y: [6604.5, 6614.4, 6602.26, 6608.02]
    },
    {
      x: new Date(1538796600000),
      y: [6608.02, 6610.68, 6601.99, 6608.91]
    },
    {
      x: new Date(1538798400000),
      y: [6608.91, 6618.99, 6608.01, 6612]
    },
    {
      x: new Date(1538800200000),
      y: [6612, 6615.13, 6605.09, 6612]
    },
    {
      x: new Date(1538802000000),
      y: [6612, 6624.12, 6608.43, 6622.95]
    },
    {
      x: new Date(1538803800000),
      y: [6623.91, 6623.91, 6615, 6615.67]
    },
    {
      x: new Date(1538805600000),
      y: [6618.69, 6618.74, 6610, 6610.4]
    },
    {
      x: new Date(1538807400000),
      y: [6611, 6622.78, 6610.4, 6614.9]
    },
    {
      x: new Date(1538809200000),
      y: [6614.9, 6626.2, 6613.33, 6623.45]
    },
    {
      x: new Date(1538811000000),
      y: [6623.48, 6627, 6618.38, 6620.35]
    },
    {
      x: new Date(1538812800000),
      y: [6619.43, 6620.35, 6610.05, 6615.53]
    },
    {
      x: new Date(1538814600000),
      y: [6615.53, 6617.93, 6610, 6615.19]
    },
    {
      x: new Date(1538816400000),
      y: [6615.19, 6621.6, 6608.2, 6620]
    },
    {
      x: new Date(1538818200000),
      y: [6619.54, 6625.17, 6614.15, 6620]
    },
    {
      x: new Date(1538820000000),
      y: [6620.33, 6634.15, 6617.24, 6624.61]
    },
    {
      x: new Date(1538821800000),
      y: [6625.95, 6626, 6611.66, 6617.58]
    },
    {
      x: new Date(1538823600000),
      y: [6619, 6625.97, 6595.27, 6598.86]
    },
    {
      x: new Date(1538825400000),
      y: [6598.86, 6598.88, 6570, 6587.16]
    },
    {
      x: new Date(1538827200000),
      y: [6588.86, 6600, 6580, 6593.4]
    },
    {
      x: new Date(1538829000000),
      y: [6593.99, 6598.89, 6585, 6587.81]
    },
    {
      x: new Date(1538830800000),
      y: [6587.81, 6592.73, 6567.14, 6578]
    },
    {
      x: new Date(1538832600000),
      y: [6578.35, 6581.72, 6567.39, 6579]
    },
    {
      x: new Date(1538834400000),
      y: [6579.38, 6580.92, 6566.77, 6575.96]
    },
    {
      x: new Date(1538836200000),
      y: [6575.96, 6589, 6571.77, 6588.92]
    },
    {
      x: new Date(1538838000000),
      y: [6588.92, 6594, 6577.55, 6589.22]
    },
    {
      x: new Date(1538839800000),
      y: [6589.3, 6598.89, 6589.1, 6596.08]
    },
    {
      x: new Date(1538841600000),
      y: [6597.5, 6600, 6588.39, 6596.25]
    },
    {
      x: new Date(1538843400000),
      y: [6598.03, 6600, 6588.73, 6595.97]
    },
    {
      x: new Date(1538845200000),
      y: [6595.97, 6602.01, 6588.17, 6602]
    },
    {
      x: new Date(1538847000000),
      y: [6602, 6607, 6596.51, 6599.95]
    },
    {
      x: new Date(1538848800000),
      y: [6600.63, 6601.21, 6590.39, 6591.02]
    },
    {
      x: new Date(1538850600000),
      y: [6591.02, 6603.08, 6591, 6591]
    },
    {
      x: new Date(1538852400000),
      y: [6591, 6601.32, 6585, 6592]
    },
    {
      x: new Date(1538854200000),
      y: [6593.13, 6596.01, 6590, 6593.34]
    },
    {
      x: new Date(1538856000000),
      y: [6593.34, 6604.76, 6582.63, 6593.86]
    },
    {
      x: new Date(1538857800000),
      y: [6593.86, 6604.28, 6586.57, 6600.01]
    },
    {
      x: new Date(1538859600000),
      y: [6601.81, 6603.21, 6592.78, 6596.25]
    },
    {
      x: new Date(1538861400000),
      y: [6596.25, 6604.2, 6590, 6602.99]
    },
    {
      x: new Date(1538863200000),
      y: [6602.99, 6606, 6584.99, 6587.81]
    },
    {
      x: new Date(1538865000000),
      y: [6587.81, 6595, 6583.27, 6591.96]
    },
    {
      x: new Date(1538866800000),
      y: [6591.97, 6596.07, 6585, 6588.39]
    },
    {
      x: new Date(1538868600000),
      y: [6587.6, 6598.21, 6587.6, 6594.27]
    },
    {
      x: new Date(1538870400000),
      y: [6596.44, 6601, 6590, 6596.55]
    },
    {
      x: new Date(1538872200000),
      y: [6598.91, 6605, 6596.61, 6600.02]
    },
    {
      x: new Date(1538874000000),
      y: [6600.55, 6605, 6589.14, 6593.01]
    },
    {
      x: new Date(1538875800000),
      y: [6593.15, 6605, 6592, 6603.06]
    },
    {
      x: new Date(1538877600000),
      y: [6603.07, 6604.5, 6599.09, 6603.89]
    },
    {
      x: new Date(1538879400000),
      y: [6604.44, 6604.44, 6600, 6603.5]
    },
    {
      x: new Date(1538881200000),
      y: [6603.5, 6603.99, 6597.5, 6603.86]
    },
    {
      x: new Date(1538883000000),
      y: [6603.85, 6605, 6600, 6604.07]
    },
    {
      x: new Date(1538884800000),
      y: [6604.98, 6606, 6604.07, 6606]
    }
  ]
  
  constructor(
    private dialogRef: MatDialogRef<ChartModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    ) {       
      console.log(this.list.length)
      this.initHistory(data.history);
      this.initCandleChart();
      this.initLineChart();
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
    // console.log(historySeries[0][0].substring(0,10));
    // let date = new Date(historySeries[0][0].substring(0,10));
    // let obj = [historySeries[0][1], historySeries[0][2], historySeries[0][3], historySeries[0][4]]
    // let newObj = {x: date, y: obj}
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

  ngOnInit(): void {
  }

  public initLineChart(): void {
    let ts2 = 1484418600000;
    let dates = [];
    for (let i = 0; i < 120; i++) {
      ts2 = ts2 + 86400000;
      dates.push([ts2, this.dataSeries[1][i].value]);
    }

    this.lineChartOptions = {
      series: [
        {
          name: "AAPL",
          data: dates
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
        labels: {
          formatter: function(val: number) {
            return (val / 1000000).toFixed(0);
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
            return (val / 1000000).toFixed(0);
          }
        }
      }  
    };
  }

  public generateDayWiseTimeSeries(baseval: number, count: number, yrange: { max: number; min: number; }) {
    var i = 0;
    var series = [];
    while (i < count) {
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([baseval, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
  
  close() {
    this.dialogRef.close();
  }
}


