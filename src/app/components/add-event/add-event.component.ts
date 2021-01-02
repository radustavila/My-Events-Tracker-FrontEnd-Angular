import { Component, ElementRef, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { MyEvent } from 'src/app/models/my-event';
import * as moment from 'moment';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapsAPILoader } from '@agm/core';

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

  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  geoCoder: any

  @ViewChild('search')
  public searchElementRef: ElementRef;


  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private utilsService: UtilsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.urls = []
    this.loadPlaces()

    if (this.location.path().startsWith("/update-event")) {
      this.modifyEvent = true
      this.eventTitle = "Update"
      this.eventService.getOne(this.route.snapshot.params.id).subscribe(
        res => {
          this.eventForm.controls["eventName"].setValue(res.name)
          this.eventForm.controls["category"].setValue(res.category)
          this.eventForm.controls["cost"].setValue(res.cost)
          this.eventForm.controls["date"].setValue(new Date(res.date))
          this.eventForm.controls['details'].setValue(res.details),
          this.urls = res.picturesList
          this.latitude = res.latitude;
          this.longitude = res.longitude;
        },
        err => {
          this.utilsService.openFailSnackBar("This event does not exist!")
          this.router.navigateByUrl("/add-event")
        }
      )
    }
  }

  private loadPlaces(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            console.log('not found')
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  
  // "@agm/core": "^3.0.0-beta.0"
  // "@angular/google-maps": "^10.2.7",
  // "@types/googlemaps": "3.39.14"


  onSubmit() {
    const date = moment(this.eventForm.controls['date'].value).format("YYYY-MM-DD");
    const event: MyEvent = {
      id: this.route.snapshot.params.id ? this.route.snapshot.params.id : null,
      name: this.eventForm.controls['eventName'].value,
      category: this.eventForm.controls['category'].value,
      cost: this.eventForm.controls['cost'].value ? this.eventForm.controls['cost'].value : 0,
      date: date,
      details: this.eventForm.controls['details'].value,
      picturesList: this.urls,
      latitude: this.latitude, 
      longitude: this.longitude
    }

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
    
    console.log(this.urls)
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
    this.files.splice(index, 1)
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