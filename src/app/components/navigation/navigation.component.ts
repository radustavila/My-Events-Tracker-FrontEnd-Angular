import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  title: string = '';
  visible: boolean = true;
  route: string = '';
  auth: boolean = false;

  constructor(
    private location: Location,
    private authService: AuthenticationService,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      this.route = location.path();
      this.onRouteChange(location.path())
    });
   }

  ngOnInit(): void {
    if (this.location.path() === '/dashboard' || this.location.path() === '') {
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

  private onRouteChange(path: string): void {
    if (path === '/dashboard') {
      this.title = 'Dashboard'
      this.visible = true
    } else if (path === '/events') {
      this.title = 'Events'
      this.visible = true
    } else if (path === '/add-event') {
      this.title = 'Add event'
      this.visible = true
    } else {
      this.title = 'My Events Tracker'
      this.visible = false
    }
  }

  
  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    if (localStorage.getItem('remember') === 'false' && this.authService.isUserLoggedIn()) {
      localStorage.clear();
    }
  }

  public titlePage(title: string): void {
    this.title = title
  }

  public logout(): void {
    this.authService.logout()
  }
}
