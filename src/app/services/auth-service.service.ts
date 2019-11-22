import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { IUser } from '../interfaces/iuser';
import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<IUser>;
  private currentUser: Observable<IUser>;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
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
  

  register(user: any): Observable<IUser> {
    return this.http.post<IUser>(
      "https://localhost:44314/api/auth/register",
      user
    );
  }

  login(email: string, password: string) {
    return this.http
      .post<IUser>("https://localhost:44314/api/auth/login", {email: email, password: password})
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

  displayPayload() {
    const token = decode(this.getToken());
    return token;
  }
}
