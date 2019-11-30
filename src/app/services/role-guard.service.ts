import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth-service.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    const token = this.authService.decodeToken();

    if (
      !this.authService.isAuthenticated() ||
      token.role !== expectedRole
    ) {
      this.router.navigateByUrl("login");
      return false;
    }
    return true;
  }
}
