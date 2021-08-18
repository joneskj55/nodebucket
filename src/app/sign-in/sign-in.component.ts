/*
============================================
; Title:  sign-in.component.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 18 Aug 2021
; Description: Sign-in component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { SignInService } from '../sign-in.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  errorMessage: string;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private fb: FormBuilder,
    private signInService: SignInService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      employeeId: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
        ]),
      ],
    });
  }

  get form() {
    return this.signInForm.controls;
  }

  onSubmit() {
    const formValues = this.signInForm.value;
    const employeeId = parseInt(formValues.employeeId);

    if (this.signInService.validate(employeeId)) {
      this.cookieService.set('session_user', employeeId.toString(), 1);
      this.router.navigate(['/']);
    } else {
      this.errorMessage = `The employee ID you entered is invalid, please try again.`;
    }
  }
}
