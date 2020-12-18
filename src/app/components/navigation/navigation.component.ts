import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  title: string = '';
  visible: boolean = true;

  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
    if (this.location.path() === '/dashboard') {
      this.title = 'Dashboard'
      this.visible = true
    } else if (this.location.path() === '/events') {
      this.title = 'Events'
      this.visible = true
    } else if (this.location.path() === '/add-event') {
      this.title = 'Add event'
      this.visible = true
    } else {
      this.title = 'My Events Tracker'
      this.visible = false
    }
  }

  titlePage(title: string): void {
    this.title = title
  }

}
