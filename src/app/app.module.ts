import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { RegisterComponent } from './components/register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { AddEventComponent } from './components/add-event/add-event.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthenticationService } from './services/authentication.service';
import { EventService } from './services/event.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { EventsListComponent } from './components/events-list/events-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { CardComponent } from './components/dashboard/card/card.component';
import { CategoryChartComponent } from './components/dashboard/charts/category-chart/category-chart.component';
import { MonthlyExpensesChartComponent } from './components/dashboard/charts/monthly-expenses-chart/monthly-expenses-chart.component';
import { DividedCostChartComponent } from './components/dashboard/charts/divided-cost-chart/divided-cost-chart.component';
import { MiniCardComponent } from './components/dashboard/mini-card/mini-card.component';
import { EventsTableComponent } from './components/dashboard/events-table/events-table.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddEventComponent,
    EventsListComponent,
    NavigationComponent,
    DashboardComponent,
    CardComponent,
    CategoryChartComponent,
    MonthlyExpensesChartComponent,
    DividedCostChartComponent,
    MiniCardComponent,
    EventsTableComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    ChartsModule,
    MatDialogModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCV7wtr26OCe-atoAmHdZsK6Zcj4K-_RXc',
      libraries: ['places']
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthenticationService,
    EventService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

