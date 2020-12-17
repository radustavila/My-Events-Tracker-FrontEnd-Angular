import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { MyEvent } from 'src/app/models/my-event';

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
    private eventService: EventService  
  ) {}

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  onSubmit() {
    alert('Thanks!');
    
    const event: MyEvent = {
      name: this.eventForm.controls['eventName'].value,
      category: this.eventForm.controls['category'].value,
      cost: this.eventForm.controls['cost'].value ? this.eventForm.controls['cost'].value : 0,
      date: this.eventForm.controls['date'].value
    }

    console.log(event)
    // this.eventService.get().subscribe(
    //   res => {
    //     console.log(res)
    //   },
    //   err => {
    //     console.log(err)
    //   }
    // )
  }
}
