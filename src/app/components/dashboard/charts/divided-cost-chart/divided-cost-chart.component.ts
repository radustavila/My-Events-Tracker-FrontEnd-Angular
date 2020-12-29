import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-divided-cost-chart',
  templateUrl: './divided-cost-chart.component.html',
  styleUrls: ['./divided-cost-chart.component.scss']
})
export class DividedCostChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      titleFontSize: 18,
      bodyFontSize: 20,
      callbacks: {
        label: function (tooltipItems, data) {
          return data.datasets[0].data[tooltipItems.index] + ' events';
        }
      }
    },
    scales: { 
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Number of Events'
        },
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Euro'
        }
     }],
    }
  };
  public barChartLabels: Label[] = ['0 €', '1-25 €', '26-50 €', '51-75 €', '76-100 €', '101-150 €', '151-250 €', '251€ <'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [], backgroundColor: "rgba(255, 153, 51, 0.7)" }
  ];
  
  constructor(
    private statsService: StatisticsService
  ) { }

  ngOnInit() {
    this.statsService.getDividedCost().subscribe(
      res => {
        for (var key in res) {
          this.barChartData[0].data.push(res[key])
        }
      }
    )
  }

}
