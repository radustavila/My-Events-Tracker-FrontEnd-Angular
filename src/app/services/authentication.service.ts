import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token';
import { User, UserLogin } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private host: string = environment.apiUrl
  private jwtHelper = new JwtHelperService()

  constructor(
    private httpClient: HttpClient
  ) { }

  public register(user: User): Observable<User | HttpErrorResponse> {
    return this.httpClient.post<User | HttpErrorResponse>
    (`${this.host}/auth/register`, user);
  }
  
  public login(user: UserLogin): Observable<Token> {
    return this.httpClient.post<Token>(`${this.host}/auth/login`, user);
  }

  public logout(): void {
    localStorage.removeItem('token')
  }

  public saveToken(token: string): void {
    localStorage.setItem('token', token)
  } 
  
  public rememberMe(rememberMe: boolean): void {
    localStorage.setItem('remember', rememberMe.toString())
  }

  public isUserLoggedIn(): boolean {
    const token = localStorage.getItem('token')
    if (token != null && token !== '' && !this.jwtHelper.isTokenExpired(token)) {
      return true
    }
    this.logout()
    return false
  }
}
