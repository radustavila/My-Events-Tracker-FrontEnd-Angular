import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { StatisticsService } from 'src/app/services/statistics.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-monthly-expenses-chart',
  templateUrl: './monthly-expenses-chart.component.html',
  styleUrls: ['./monthly-expenses-chart.component.scss']
})
export class MonthlyExpensesChartComponent implements OnInit {

  @Input() ifModifiedSince: boolean

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Current Year'  },
    { data: [], label: 'Previous Year' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      titleFontSize: 18,
      bodyFontSize: 20
    },
    legend: {
      labels: {
        fontSize: 15
      }
    },
    scales: { 
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Euro'
         }
      }]
    }
  };
  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(
    private statsService: StatisticsService,
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
    if (this.ifModifiedSince) {
      this.statsService.getMonthlyStats().subscribe(
        res => {
          for (var key in res[0]) {
            this.lineChartLabels.push(key)
            this.lineChartData[0].data.push(res[0][key]);
          }
          for (var key in res[1]) {
            this.lineChartData[1].data.push(res[1][key])
          }
          localStorage.setItem('monthly-expenses-chart', JSON.stringify(res))
        }, 
        err => {
          if (err.status === 0) {
            this.utilsService.openFailSnackBar("Bad Request!")
          } else {
            this.utilsService.openFailSnackBar(err.error)
          }
        }
      )
    } else {
      const res = JSON.parse(localStorage.getItem('monthly-expenses-chart'))
      for (var key in res[0]) {
        this.lineChartLabels.push(key)
        this.lineChartData[0].data.push(res[0][key]);
      }
      for (var key in res[1]) {
        this.lineChartData[1].data.push(res[1][key])
      }
    }
  }
}
