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
  // use the router to navigate to the signin page if the user is not authenticated
  constructor(private router: Router, private cookieService: CookieService) {}

  // check if the user is authenticated
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const sessionUser = this.cookieService.get('session_user');

    //if the user is not authenticated, redirect to the signin page
    if (sessionUser) {
      return true; // allow navigation
    } else {
      // redirect to the signin page
      this.router.navigate(['/session/signin']);
      return false;
    }
  }
}
