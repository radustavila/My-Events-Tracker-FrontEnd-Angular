import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
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

  years: any[] = [2020, 2019, 2018]
  categories: string[] = ['Art', 'Ceremony', 'Concert', 'Conference', 'Festival', 'Tournament', 'Trip', 'Sport'];
  
  searchText: string = ""
  visible: boolean = false
  category: string
  year: number

  @HostListener('input') oninput() {
    this.searchItems();
  }

  constructor(
    private eventService: EventService,
    private utilsService: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataSource = new EventsListDataSource(this.eventService, this.utilsService);
    this.fetchYears()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  redirectToInfo(id: number): void {
    this.router.navigateByUrl(`/info-event/${id}`)
  }

  delete(id: number): void {
    this.eventService.delete(id).subscribe(
      res => {
        this.dataSource.fetchData()
        this.utilsService.openSuccesSnackBar("Event deleted successfully!")
      },
      err => {
        console.log(err)
        this.utilsService.openFailSnackBar("Failed event deletion!")
      }
    )
  }

  update(id: number): void {
    this.router.navigateByUrl(`/update-event/${id}`)
  }

  fetchYears(): void {
    this.eventService.getYears().subscribe(
      res => {
        this.years = res.reverse()
        if (res) { 
          this.utilsService.hideloader()
          this.visible = true
        } 
      },
      err => {
        console.log(err)
        this.utilsService.openFailSnackBar("Failed item deletion!")
      }
    )
  }

  searchItems() {
    if (this.searchText) {
      this.dataSource.data = this.dataSource.filterByName(this.searchText)
    } else {
      this.dataSource.data = this.dataSource.initialData
    }
  }

  selectCategory(category: string) {
    if (this.year != undefined) {
      if (category === undefined) {
        this.dataSource.data = this.dataSource.filterByYear(this.year)
      } else {
        this.dataSource.data = this.dataSource.filter(category, this.year)
      }
    } else {
      if (category === undefined) {
        this.dataSource.data = this.dataSource.initialData
      } else {
        this.dataSource.data = this.dataSource.filterByCategory(category)
      }
    }
    this.category = category
  }

  selectYear(selectedYear: number) {
    if (this.category != undefined) {
      if (selectedYear === undefined) {
        this.dataSource.data = this.dataSource.filterByCategory(this.category)
      } else {
        this.dataSource.data = this.dataSource.filter(this.category, selectedYear)
      }
    } else {
      if (selectedYear === undefined) {
        this.dataSource.data = this.dataSource.initialData
      } else {
        this.dataSource.data = this.dataSource.filterByYear(selectedYear)
      }
    }
    this.year = selectedYear
  }
}
