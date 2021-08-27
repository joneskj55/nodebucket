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

/**
 * get employee by id
 */
router.get("/:empId", async (req, res) => {
  /**
   * find one employee by id using the employee model and mongoose
   */
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      /**
       * log any errors to the console and return a 500 error to the user if the database * is unable to find the employee by id or if there is an error in the database
       */
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "MongoDB server error: " + err.message,
        });
      } else {
        /**
         * return and log the employee object to the console if the database is able to find the employee by id
         */
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (e) {
    /**
     * catch any errors and log them to the console
     */
    console.log(e);
    res.status(500).send({
      message: "Internal server error: " + e.message,
    });
  }
});

/**
 * get all tasks for an employee
 */
router.get("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne(
      { empId: req.params.empId },
      "empId todo done",
      function (err, employee) {
        if (err) {
          console.log(err);
          res.status(501).send({
            message: "MongoDB server error: " + err.message,
          });
        } else {
          console.log(employee);
          res.json(employee);
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Internal server error: " + e.message,
    });
  }
});

/**
 * create a new task
 */
router.post("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: "MongoDB Exception: " + err.message,
        });
      } else {
        console.log(employee);
        const newTask = {
          text: req.body.text,
        };
        employee.todo.push(newTask);
        employee.save(function (err, updatedEmployee) {
          if (err) {
            console.log(err);
            res.status(501).send({
              message: "MongoDB Exception: " + err.message,
            });
          } else {
            console.log(updatedEmployee);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Internal server error: " + e.message,
    });
  }
});
module.exports = router;
