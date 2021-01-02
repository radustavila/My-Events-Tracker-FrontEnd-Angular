import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MyEvent } from 'src/app/models/my-event';
import { EventService } from 'src/app/services/event.service';
import { UtilsService } from 'src/app/services/utils.service';
import { DialogData } from '../add-event/add-event.component';

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
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  event: MyEvent
  visible: boolean = false

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
        if (res) { 
          this.hideloader(); 
          this.visible = true
        } 
      },
      err => {
        this.utilsService.openFailSnackBar("This event does not exist!")
      }
    )
  }

  update(id: number): void {
    this.router.navigateByUrl(`/update-event/${id}`)
  }

  openDialog(url: string): void {
    this.dialog.open(DialogData, {
      data: {
        image: url
      }
    });
  }

  hideloader(): void { 
  
    // Setting display of spinner 
    // element to none 
    document.getElementById('loading') 
        .style.display = 'none'; 
  } 
}
