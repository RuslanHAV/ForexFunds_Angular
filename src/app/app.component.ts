import { Component, Input, OnInit, ViewChild } from "@angular/core";

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexLegend,
  ApexResponsive,
  ChartComponent,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};

declare var jQuery: any;

var wins:any=[0, 56, 31, 5, 521, 506, 36];
var loses:any=[0, 21, 32, 1, 24, 23, 7];

function convertStrokeOpacity(){
  document.addEventListener("DOMContentLoaded", function(event) { 
    var radialSeries = document.querySelectorAll('.apexcharts-radial-series > path');
    for(var i = 0 ; i < radialSeries.length ; i ++){
      var x = radialSeries[i];
      var prev, cur;
      prev = x.getAttribute('stroke');
      if(prev) cur = prev.split(',')[0] + ',' + prev.split(',')[1] + ',' + prev.split(',')[2]+ ',1)';
      if(cur) x.setAttribute('stroke', cur);
    }

    var spanWins = document.querySelectorAll('span.wins');
    for(i = 0 ; i < wins.length ; i ++){
      x = spanWins[i];
      var id = x.getAttribute('index');
      if(id) x.innerHTML = wins[id]
    }
    var spanLoses = document.querySelectorAll('span.loses');
    for(i = 0 ; i < loses.length ; i ++){
      x = spanLoses[i];
      id = x.getAttribute('index');
      if(id) x.innerHTML = loses[id]
    }
  });
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit{
  @ViewChild("chart") chart: ChartComponent | undefined;
  @Input() series: ApexNonAxisChartSeries = [];
  
  public chartOptions : ChartOptions = {
    chart: {
      height: 500,
      type: "radialBar",
    },
    
    plotOptions: {
      radialBar: {
        inverseOrder: false,
        offsetY: 0,
        offsetX:-80,
        startAngle: -270,
        endAngle: 0,
        hollow: {
          margin: 100,
          size: "20%",
          background: "transparent",
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            show: false
          }
        },
        track: {
          show: true,
          background: '#393D43',
          strokeWidth: '50%',
          opacity: 1,
        },
      },
    },
    stroke:{
      show: true,
      curve: 'smooth',
      lineCap: "round",
    },
    colors: ["#08872B", "#D5FF00", "#9A70FF", "#FF00B8", "#FF5454", "#7035FF", "#8B0CAB"],
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    legend: {
      show: true,
      floating: true,
      fontSize: "14px",
      position: "right",
      offsetX: 30,
      offsetY: 10,
      labels: {
        useSeriesColors: true
      },
      onItemClick: {
        toggleDataSeries: false
      },
      onItemHover: {
          highlightDataSeries: false
      },
      
      formatter: function(seriesName, opts) {
        let wins = opts.w.globals.series[opts.seriesIndex];
        // let nbsps = [12, 11, 6, 10, 15, 11, 13]
        // for(var i = 0 ; i < nbsps[opts.seriesIndex]; i ++) firstSpaces += "&nbsp;"; 

        let loses = 100 - wins;
        return "<div style='display:inline-flex;'>"+
                "<div style='width:120px'>"+
                  seriesName + ":" +
                "</div>"+          
                "<div style='width:120px'>"+
                  "<font color='white'>"+
                      "wins: " + 
                      "<span class='wins' index="+opts.seriesIndex+">" + wins + "</span>" +
                  "</font>"+
                "</div>"+ 
                "<div >"+
                    "<font color='white'>"+
                      "loses: " + 
                      "<span class='loses' index="+opts.seriesIndex+">" + loses + "</span>" + 
                    "</font>"+
                    "</div>"+
                "</div>";
      },
      itemMargin: {
        horizontal: 10
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false
          }
        }
      }
    ]
  };

  ngOnInit(): void {
    convertStrokeOpacity();
    var _wins = wins;
    var _loses = loses;
    var _series = [];

    for(var i = 0 ; i < _wins.length ; i ++){
      var win = _wins[i];
      var lose = _loses[i];
      var tot = win + lose;
      var result;
      
      if(win == 0) result = NaN;
      else if(loses == 0) result = 100
      else result = Math.floor((_wins[i]/tot)*100);

      _series.push(result)
    }
    this.series = _series;

    console.log(_series)
  } 
}
