/*
============================================
; Title:  employee.interface.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 25 Aug 2021
; Description: Interface for Employee object
;===========================================
*/

import { Item } from './item.interface';

export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[];
}
