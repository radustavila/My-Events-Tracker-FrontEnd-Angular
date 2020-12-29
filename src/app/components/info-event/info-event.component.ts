import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyEvent } from 'src/app/models/my-event';
import { EventService } from 'src/app/services/event.service';
import { UtilsService } from 'src/app/services/utils.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-info-event',
  templateUrl: './info-event.component.html',
  styleUrls: ['./info-event.component.scss']
})
export class InfoEventComponent implements OnInit {

  constructor(
    private eventService: EventService,
    private utilsService: UtilsService,
    private route: ActivatedRoute
  ) { }

  event: MyEvent

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  

  ngOnInit(): void {
    this.eventService.getOne(this.route.snapshot.params.id).subscribe(
      res => {
        const event1: MyEvent = {
          id: res.id,
          name: res.name,
          category: res.category,
          cost: res.cost,
          date: res.date,
          details: res.details,
          picturesList: res.picturesList,
          latitude: res.latitude, 
          longitude: res.longitude
        }
        this.event = event1
      },
      err => {
        this.utilsService.openFailSnackBar("This event does not exist!")
      }
    )
  }
}
