import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EventService } from 'src/app/services/event.service';
import { UtilsService } from 'src/app/services/utils.service';
import { EventsListItem } from '../../events-list/events-list-datasource';
import { EventsTableDataSource } from './events-table-datasource';

@Component({
  selector: 'app-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss']
})
export class EventsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<EventsListItem>;
  dataSource: EventsTableDataSource;
  

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ 'date', 'name', 'category', 'cost'];

  constructor(
    private eventService: EventService,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.dataSource = new EventsTableDataSource(
      this.eventService, 
      this.utilsService
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
