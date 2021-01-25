import { HttpClient, HttpResponse } from '@angular/common/http';
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

  public getCostEventsSummary(): Observable<any> {
    return this.http.get<any>(`${this.host}/stats/summary`, {observe: "response"})
  }
}
