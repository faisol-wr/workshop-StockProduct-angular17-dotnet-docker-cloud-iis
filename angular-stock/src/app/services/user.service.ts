import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserModelLogin, UserModelRegister } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = environment.dotnet_api_url;

  // Header
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  private http = inject(HttpClient);

  // Login API
  login(data: UserModelLogin): Observable<UserModelLogin> {
    return this.http.post<UserModelLogin>(
      this.apiURL + 'Authenticate/login',
      data,
      this.httpOptions
    );
  }

  // Register API
  register(data: UserModelRegister): Observable<UserModelRegister> {
    return this.http.post<UserModelRegister>(
      this.apiURL + 'Authenticate/register-user',
      data,
      this.httpOptions
    );
  }
}
