import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private host: string = environment.apiUrl

  constructor(
    private httpClient: HttpClient
  ) { }

  // save() : Observable<any> {
  //   return this.httpClient.post<any>()
  // }

  get(): Observable<any> {
    return this.httpClient.get<any>(`${this.host}/events`)
  }

}
