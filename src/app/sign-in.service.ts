/*
============================================
; Title:  sign-in.service.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 18 Aug 2021
; Description: Sign-in service file
;===========================================
*/

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  employeeIds: Array<number>;
  constructor() {
    this.employeeIds = [1007, 1008, 1009, 1010, 1011, 1012];
  }

  // iterate over employeeIds and return true if there is a match, else return false
  validate(employeeId: number) {
    return this.employeeIds.some((id) => id === employeeId);
  }
}
