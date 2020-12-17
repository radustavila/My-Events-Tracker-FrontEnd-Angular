import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEventComponent } from './components/add-event/add-event.component';
import { DashComponent } from './components/dash/dash.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
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
    component: DashComponent
  },
  {
    path: 'add-event',
    component: AddEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
