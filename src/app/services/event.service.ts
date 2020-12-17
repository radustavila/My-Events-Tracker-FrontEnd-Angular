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

  public save(event: MyEvent) : Observable<Boolean> {
    return this.httpClient.post<Boolean>(`${this.host}/events`, event)
  }

  public get(): Observable<any> {
    return this.httpClient.get<any>(`${this.host}/events`)
  }

}
