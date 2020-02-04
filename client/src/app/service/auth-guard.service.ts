import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private helper = new JwtHelperService();

  constructor(
    private router: Router
  ) { }

  canActivate() {
    try {
      if (!this.helper.isTokenExpired(localStorage.getItem("token"))) {
        return true;
      }
    } catch (error) { }
    this.router.navigate(['/login']);
    return false;
  }
}
