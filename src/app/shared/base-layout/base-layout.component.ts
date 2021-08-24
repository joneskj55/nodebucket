/*
============================================
; Title:  base-layout.component.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 19 Aug 2021
; Description: Base layout component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now(); // current date
  isLoggedIn: boolean; // check if user is logged in

  // inject router and cookie service to component
  constructor(private cookieService: CookieService, private router: Router) {
    this.isLoggedIn = this.cookieService.get('session_user') ? true : false;
  }

  ngOnInit(): void {}

  // sign out user
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }
}
