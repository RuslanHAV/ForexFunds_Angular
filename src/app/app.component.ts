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
  // series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};

declare var jQuery: any;

var wins:any=[66, 56, 31, 5, 521, 506, 36];
var loses:any=[15, 21, 32, 1, 24, 23, 7];

function convertStrokeOpacity(){
  (function ($) {
    $(document).ready(function(){
      var radialSeries = $('.apexcharts-radial-series > path');
      for(var x of radialSeries){
        var prev = $(x).attr('stroke');
        var cur = prev.split(',')[0] + ',' + prev.split(',')[1] + ',' + prev.split(',')[2]+ ',1)';
        $(x).attr('stroke', cur)
      }

      var spanWins = $('span.wins');
      for(var x of spanWins){
        var id = $(x).attr('index');
        $(x).html(wins[id])
      }
      var spanLoses = $('span.loses');
      for(var x of spanLoses){
        var id = $(x).attr('index');
        $(x).html(loses[id])
      }

    });
  })(jQuery);
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
        let firstSpaces = "";
        switch(opts.w.config.labels[opts.seriesIndex]){
          case "Monday":
            firstSpaces = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            break;
          case "Tuesday":
            firstSpaces = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            break;
          case "Wednesday":
            firstSpaces = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            break;
          case "Thursday":
            firstSpaces = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            break;
          case "Friday":
            firstSpaces = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            break;
          case "Saturday":
            firstSpaces = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            break;
          case "Sunday":
            firstSpaces = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            break;
          default: break;
        }
        let loses = 100 - wins;
        return seriesName + ":" + firstSpaces +
                "<div style='opacity:0.6; display:inline-flex;'>"+
                  "<div style='width:120px'>"+
                  "<font color='white'>"+
                      "wins: " + 
                      "<span class='wins' index="+opts.seriesIndex+">" + wins + "</span>" +
                  "</font>"+
                  "</div>"+ 
                  "<div style='width:60px'>"+
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
      var tot = _wins[i] + _loses[i];
      _series.push(Math.floor((_wins[i]/tot)*100))
    }
    this.series = _series;
  } 
}
