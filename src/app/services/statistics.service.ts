import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
}