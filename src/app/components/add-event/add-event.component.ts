import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { MyEvent } from 'src/app/models/my-event';
import * as moment from 'moment';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent {
  eventForm = this.fb.group({
    eventName: [null, Validators.required],
    category: [null, Validators.required],
    date: [null, Validators.required],
    cost: [null, Validators.min(0)],
  });

  categories = [
    {name: 'Art'},
    {name: 'Ceremony'},
    {name: 'Concert'},
    {name: 'Conference'},
    {name: 'Festival'},
    {name: 'Tournament'},
    {name: 'Sport'},
    {name: 'Workshop'},
  ];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private utilsService: UtilsService,
    private router: Router  
  ) {}

  onSubmit() {

    const date = moment(this.eventForm.controls['date'].value).format("YYYY/MM/DD");

    const event: MyEvent = {
      id: null,
      name: this.eventForm.controls['eventName'].value,
      category: this.eventForm.controls['category'].value,
      cost: this.eventForm.controls['cost'].value ? this.eventForm.controls['cost'].value : 0,
      date: date
    }

    this.eventService.save(event).subscribe(
      res => {
        console.log(res)
        this.utilsService.openSuccesSnackBar("The event has been added succsessfully!")
        this.router.navigateByUrl('/dashboard')
      },
      err => {
        console.log(err)
        this.utilsService.openFailSnackBar("Saving the event failed!")
      }
    )
  }
}
