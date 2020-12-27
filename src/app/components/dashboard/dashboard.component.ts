import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Summary } from 'src/app/models/summary';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */

  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          maxiCard: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }
 
     return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 2, rows: 2 },
        maxiCard: { cols: 2, rows: 3 },
        table: { cols: 2, rows: 3 },
      };
    })
  );

  miniCardData: Summary[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private statsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.statsService.getCostEventsSummary().subscribe(
      res => {
        this.miniCardData = res
      },
      err => {
        console.log(err)
      }
    )
  }
}
