/*
============================================
; Title:  employee.js
; Author: Professor Krasso
; Modified By: Kevin Jones
; Date: 16 Aug 2021
; Description: Interface for Service object
;===========================================
*/

const express = require("express");
const Employee = require("../models/employee");

const router = express.Router();

// get employee by id
router.get("/:empId", async (req, res) => {
  // find one employee by id using the employee model and mongoose
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      // log any errors to the console and return a 500 error to the user if the database is unable to find the employee by id or if there is an error in the database
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "MongoDB server error: " + err.message,
        });
      }
      // return and log the employee object to the console if the database is able to find the employee by id
      else {
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (e) {
    // catch any errors and log them to the console
    console.log(e);
    res.status(500).send({
      message: "Internal server error: " + e.message,
    });
  }
});

module.exports = router;
