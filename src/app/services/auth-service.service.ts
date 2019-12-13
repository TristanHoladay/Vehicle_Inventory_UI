import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { IUser } from '../interfaces/iuser';
import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UrlService } from './url.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = this.URL.getURL();

  private currentUserSubject: BehaviorSubject<IUser>;
  private currentUser: Observable<IUser>;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private URL: UrlService
    ) { 
    this.currentUserSubject = new BehaviorSubject<IUser>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  public get User(): Observable<IUser> {
    return this.currentUser;
  }

  public getToken(): string {
    return localStorage.getItem("token");
  }

   public isAuthenticated(): boolean {
     const token = this.getToken();
     return !this.jwtHelper.isTokenExpired(token);
   }
  

  login(email: string, password: string) {
    return this.http
      .post<IUser>(`${this.url}/auth/login`, {email: email, password: password})
      .pipe(
        map(user => {

          localStorage.setItem("currentUser", JSON.stringify(user));
          localStorage.setItem("token", user['token']);
          this.currentUserSubject.next(user);
          return user;
        })
    );
  };

  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }

  decodeToken() {
    const token = decode(this.getToken());
    token.role = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return token;
  }
}
 