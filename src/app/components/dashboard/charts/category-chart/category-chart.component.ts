import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.scss']
})
export class CategoryChartComponent implements OnInit {

  totalCount: number

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      labels: {
        fontSize: 14,
        usePointStyle: true
      }
    },
    tooltips: {
      titleFontSize: 18,
      bodyFontSize: 20,
    },
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: any[] = [
    { 
      backgroundColor: ["#B8255F", "#FF9933", "#AFB83B", "#299438", "#158FAD", "#96C3EB", "#884DFF", "#EB96EB"] 
    }
  ];

  constructor(
    private statsService: StatisticsService
  ) { }

  ngOnInit() {
    this.statsService.getCategoryStats().subscribe(
      res => {
        for (var key in res) {
          this.pieChartLabels.push(key)
          this.pieChartData.push(res[key])
          this.totalCount += res[key]
        }
        if (this.pieChartLabels.length === 0) {
          this.pieChartLabels.push("No Records")
        }
      },
      err => {
        console.log(err)
      }
    )
  }

}
