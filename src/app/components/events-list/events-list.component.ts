import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { UtilsService } from 'src/app/services/utils.service';
import { EventsListDataSource, EventsListItem } from './events-list-datasource';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<EventsListItem>;
  dataSource: EventsListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'date', 'name', 'category', 'cost', 'edit', 'delete'];

  constructor(
    private eventService: EventService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataSource = new EventsListDataSource(this.eventService, this.utilsService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  delete(id: number): void {
    this.eventService.delete(id).subscribe(
      res => {
        this.dataSource.fetchData()
      },
      err => {
        console.log(err)
        this.utilsService.openFailSnackBar("Failed item deletion!")
      }
    )
  }

  update(id: number): void {
    this.router.navigateByUrl(`/update-event/${id}`)
  }
}
