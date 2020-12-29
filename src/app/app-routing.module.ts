import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEventComponent } from './components/add-event/add-event.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { InfoEventComponent } from './components/info-event/info-event.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-event',
    component: AddEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-event/:id',
    component: AddEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    component: EventsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'info-event/:id',
    component: InfoEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
