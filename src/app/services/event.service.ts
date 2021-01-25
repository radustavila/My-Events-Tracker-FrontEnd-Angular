import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MyEvent } from '../models/my-event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private host: string = environment.apiUrl

  constructor(
    private httpClient: HttpClient
  ) { }

  public save(event: MyEvent): Observable<MyEvent> {
    return this.httpClient.post<MyEvent>(`${this.host}/events`, event)
  }

  public get(): Observable<any> {
    return this.httpClient.get<MyEvent[]>(`${this.host}/events`, {observe: 'response'})
  }

  public getOne(id: number): Observable<MyEvent> {
    return this.httpClient.get<MyEvent>(`${this.host}/events/${id}`)
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.host}/events/${id}`)
  }

  public getYears(): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.host}/stats/years`)
  }
}
