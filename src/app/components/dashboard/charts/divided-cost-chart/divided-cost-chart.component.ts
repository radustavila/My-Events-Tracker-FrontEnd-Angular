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
    scales: { 
      yAxes: [{
         scaleLabel: {
            display: true,
            labelString: 'Number of Events'
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
  public barChartLabels: Label[] = ['0', '1-25', '26-50', '51-75', '76-100', '101-150', '151-250', '251<'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];
  
  constructor(
    private statsService: StatisticsService
  ) { }

  ngOnInit() {
    this.statsService.getDividedCost().subscribe(
      res => {
        var values = []
        for (var key in res) {
          values.push(res[key])
        }
        this.barChartData.push({data: values, backgroundColor: '#FF9933'})
      }
    )
  }

}
