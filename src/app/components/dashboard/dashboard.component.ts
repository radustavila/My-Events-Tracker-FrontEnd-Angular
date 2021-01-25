import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Summary } from 'src/app/models/summary';
import { UtilsService } from 'src/app/services/utils.service';

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
  visible: boolean = false
  ifModifiedSince: boolean = true

  constructor(
    private breakpointObserver: BreakpointObserver,
    private statsService: StatisticsService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.statsService.getCostEventsSummary().subscribe(
      res => {
        this.miniCardData = res.body
        localStorage.setItem("mini-card-data", JSON.stringify(res.body))
        // localStorage.setItem("last-modified", res.headers.get("x-last-modified"))
        if (res) { 
          this.utilsService.hideloader()
          this.visible = true
        } 
      },
      err => {
        if (err.status == 304) {
          this.miniCardData = JSON.parse(localStorage.getItem("mini-card-data"))
          this.utilsService.hideloader()
          this.visible = true
          this.ifModifiedSince = false
        } else if (err.status === 0 || err.status === 400) {
          this.utilsService.openFailSnackBar("Bad Request!")
        } else if (err.status >= 500) {
          this.utilsService.openFailSnackBar("Server Error...")
        } else {
          console.log(err.error)
        }
      }
    )
  }
}
