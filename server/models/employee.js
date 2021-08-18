/*
============================================
; Title:  employee.js
; Author: Professor Krasso
; Modified By: Kevin Jones
; Date: 16 Aug 2021
; Description: Interface for Service object
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our employee schema
let employeeSchema = new Schema(
  {
    empId: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
  },
  { collection: "employees" }
);

module.exports = mongoose.model("Employee", employeeSchema);
