import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { MyEvent } from 'src/app/models/my-event';
import * as moment from 'moment';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  eventForm = this.fb.group({
    eventName: [null, Validators.required],
    category: [null, Validators.required],
    date: [null, Validators.required],
    cost: [null, Validators.min(0)],
    details: [null]
  });

  categories = [
    {name: 'Art'},
    {name: 'Ceremony'},
    {name: 'Concert'},
    {name: 'Conference'},
    {name: 'Festival'},
    {name: 'Tournament'},
    {name: 'Trip'},
    {name: 'Sport'}
  ];

  modifyEvent: boolean = false;
  eventTitle: string = "Add"
  
  files = [];
  msg = "";
  urls = new Array<string>();


  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private utilsService: UtilsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.location.path().startsWith("/update-event")) {
      this.modifyEvent = true
      this.eventTitle = "Update"
      this.eventService.getOne(this.route.snapshot.params.id).subscribe(
        res => {
          this.eventForm.controls["eventName"].setValue(res.name)
          this.eventForm.controls["category"].setValue(res.category)
          this.eventForm.controls["date"].setValue(new Date(res.date))
          this.eventForm.controls["cost"].setValue(res.cost)
          this.urls = res.picturesList
        },
        err => {
          this.utilsService.openFailSnackBar("This event does not exist!")
          this.router.navigateByUrl("/add-event")
        }
      )
    }
  }

  onSubmit() {
    const date = moment(this.eventForm.controls['date'].value).format("YYYY-MM-DD");
    const event: MyEvent = {
      id: this.route.snapshot.params.id ? this.route.snapshot.params.id : null,
      name: this.eventForm.controls['eventName'].value,
      category: this.eventForm.controls['category'].value,
      cost: this.eventForm.controls['cost'].value ? this.eventForm.controls['cost'].value : 0,
      date: date,
      picturesList: this.urls
    }
    console.log(event.picturesList)
    this.eventService.save(event).subscribe(
      res => {
        if (this.modifyEvent) {
          this.utilsService.openSuccesSnackBar("The event has been updated succsessfully!")
        } else {
          this.utilsService.openSuccesSnackBar("The event has been added succsessfully!")
        }
        this.router.navigateByUrl('/events')
      },
      err => {
        console.log(err)
        this.utilsService.openFailSnackBar("Saving the event failed!")
      }
    )
  }

  
  getFileDetails(e) {  
    this.msg = "";
    for (let index = 0; index < e.target.files.length; index++) {
      
      var mimeType = e.target.files[index].type;
      
      if (mimeType.match(/image\/*/) == null) {
        if (this.msg === "") {
          this.msg = "<p>Only images are supported!</p>"  
        }
        this.msg += "<p>" + e.target.files[index].name + " is not valid!</p>";
        
      } else {
        this.files.push(e.target.files[index]);
      }
    }

    this.urls = [];
    for (let file of this.files) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.urls.push(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }  

  openDialog(url: string): void {
    this.dialog.open(DialogData, {
      data: {
        image: url
      }
    });
  }

  delete(index: number): void {
    this.urls.splice(index, 1)
  }
}



export interface DialogData {
  image: string
}

@Component({
  selector: 'dialog-data',
  templateUrl: './image-dialog-data.html',
})
export class DialogData {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

}