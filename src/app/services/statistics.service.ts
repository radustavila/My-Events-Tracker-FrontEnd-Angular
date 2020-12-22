import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Summary } from '../models/summary';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private host: string = environment.apiUrl

  constructor(
    private http: HttpClient
  ) { }

  public getCategoryStats(): Observable<any> {
    return this.http.get<any>(`${this.host}/stats/category`)
  }

  public getDividedCost(): Observable<any> {
    return this.http.get<any>(`${this.host}/stats/divided-cost`)
  }

  public getMonthlyStats(): Observable<any> {
    return this.http.get<any>(`${this.host}/stats/monthly-expenses`)
  }

  public getCostEventsSummary(): Observable<Summary[]> {
    return this.http.get<Summary[]>(`${this.host}/stats/summary`)
  }
}
