import { Component, ViewChild } from "@angular/core";
import { jqxBarGaugeModule } from 'jqwidgets-ng/jqxbargauge';           

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
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("chart") chart: ChartComponent | undefined;

    public chartOptions : ChartOptions = {
      series: [90, 80, 70, 60, 70, 80, 60],
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
            dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5
            }
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
        offsetX: 50,
        offsetY: 10,
        labels: {
          useSeriesColors: true
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
          let spaces = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
          return seriesName + ":" + firstSpaces +"<div style='opacity:0.6; display:inline'><font color='white'>wins: " + wins + spaces + "loses: "+loses+"</font></div>";
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
}
