import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from './url.service';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService<IUser> {
  url: string = this.URL.getURL();

  constructor(
    private http: HttpClient,
    private URL: UrlService
  ) { }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(
      `${this.url}/users`
    );
  }

  //getUserBy Name?

  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(
      `${this.url}/auth/register`, user
    );
  }

  updateUser(id: string, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(
    `${this.url}/users` + id , user
    );
  }

  deleteUser(id: string): Observable<IUser> {
    return this.http.delete<IUser>(
      `${this.url}/users` + id
    );
  }

}
