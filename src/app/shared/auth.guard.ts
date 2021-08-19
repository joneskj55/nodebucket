/*
============================================
; Title:  auth.guard.ts
; Author: Kevin Jones
; Date: 19 Aug 2021
; Description: Authentication Guard file
;===========================================
*/

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  //comments
  /**
  @param
  */

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const sessionUser = this.cookieService.get('session_user');

    //comments
    if (sessionUser) {
      return true; //code comments
    } else {
      this.router.navigate(['/session/signin']);
      return false;
    }
  }
}
