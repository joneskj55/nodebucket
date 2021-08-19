/*
============================================
; Title:  signin.component.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 19 Aug 2021
; Description: Sign-in component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  error: string;

  constructor(
    private cookieService: CookieService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  //commensts
  ngOnInit(): void {
    this.form = this.fb.group({
      empId: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
    });
  }

  // comments
  login(): void {
    const empId = this.form.controls['empId'].value;
    this.http.get('/api/employees/' + empId).subscribe((res) => {
      if (res) {
        this.cookieService.set('session_user', empId, 1); // comments
        this.router.navigate(['/']);
      } else {
        this.error = 'Invalid Employee ID';
      }
    });
  }
}
