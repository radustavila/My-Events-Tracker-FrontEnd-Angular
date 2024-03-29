import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { UtilsService } from 'src/app/services/utils.service';

// TODO: Replace this with your own data model type
export interface EventsListItem {
  id: number;
  name: string;
  category: string;
  cost: number;
  date: string;
}

/**
 * Data source for the EventsList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EventsListDataSource extends DataSource<EventsListItem> {
  
  paginator: MatPaginator;
  sort: MatSort;
  data: EventsListItem[];
  initialData: EventsListItem[] = []

  constructor(
    private eventService: EventService,
    private utilsService: UtilsService
  ) {
    super();
    this.fetchData()
  }


  fetchData(): void {
    this.eventService.get().subscribe(
      res => {
        this.data = res.body
        this.initialData = res.body
        localStorage.setItem('events', JSON.stringify(res.body))
      },
      err => {
        if (err.status === 304) {
          const res = JSON.parse(localStorage.getItem('events'))
          this.data = res
          this.initialData = res
        }
        else {
          console.log(err)
          this.utilsService.openFailSnackBar("Could not retrive data from server!")
        }
      }
    )
  }

  filterByName(filter: string): EventsListItem[] {
    filter = filter.toLowerCase()
    var filteredData: EventsListItem[] = []
    this.initialData.forEach(element => {
      if (element.name.toLowerCase().includes(filter)) {
        filteredData.push(element)
      }
    });
    return filteredData
  }

  filter(category: string, year: number): EventsListItem[] {
    let filteredData: EventsListItem[] = []
    this.initialData.forEach(element => {
      if (element.category === category && Number(element.date.substring(0, 4)) === year) {

        filteredData.push(element)
      }
    });
    return filteredData
  }

  filterByCategory(filter: string): EventsListItem[] {
    var filteredData: EventsListItem[] = []
    this.initialData.forEach(element => {
      if (element.category === filter) {
        filteredData.push(element)
      }
    });
    return filteredData
  }

  filterByYear(filter: number): EventsListItem[] {
    var filteredData: EventsListItem[] = []
    this.initialData.forEach(element => {
      if (Number(element.date.substring(0, 4)) === filter) {
        filteredData.push(element)
      }
    });
    return filteredData
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<EventsListItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];
    
    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: EventsListItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: EventsListItem[]) {
    // console.log("aici")
    // console.log(this.sort.active)
    if (!this.sort.active || this.sort.direction === '') {
      // console.log("aici1")
      return data;
    }

    return data.sort((a, b) => {
      // console.log("aici2")
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'category': return compare(a.category, b.category, isAsc);
        case 'cost': return compare(+a.cost, +b.cost, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example Date/Name/Category/Cost columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
