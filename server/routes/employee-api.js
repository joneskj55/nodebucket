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
const BaseResponse = require("../models/base-response");

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
            res.json(updatedEmployee);
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

// update an existing task
router.put("/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      // if there is an error in the database, return a 500 error
      if (err) {
        console.log(err);
        const updateTaskMongoErrorResponse = new BaseResponse(
          "501",
          "Mongo sever error",
          err
        );
        res.status(501).send(updateTaskMongoErrorResponse.toObject());
        // if the database is able to find the employee by id then update the task
      } else {
        console.log(employee);
        employee.set({
          todo: req.body.todo,
          done: req.body.done,
        });

        // save the updated employee
        employee.save(function (err, updatedEmployee) {
          // if there is an error in the database, return a 500 error
          if (err) {
            console.log(err);
            const updateTAskMongoOnSaveErrorResponse = new BaseResponse(
              "501",
              "Mongo sever error",
              err
            );
            // if the database is able to find the employee by id then update the task
          } else {
            console.log(updatedEmployee);
            const updatedTaskSuccessResponse = new BaseResponse(
              "200",
              "Update successful",
              updatedEmployee
            );
            res.status(200).send(updatedTaskSuccessResponse.toObject());
          }
        });
      }
    });
    // catch any errors and log them to the console
  } catch (e) {
    console.log(e);
    const updateTaskServerErrorResponse = new BaseResponse(
      "500",
      "Internal server error",
      e
    );
    res.status(500).send(updateTaskServerErrorResponse.toObject());
  }
});

// delete an existing task
router.delete("/:empId/tasks/:taskId", async (req, res) => {
  // try to find the employee by id
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      // if there is an error in the database, return a 500 error
      if (err) {
        console.log(err);
        const deleteTaskMongoErrorResponse = new BaseResponse(
          "501",
          "Mongo sever error",
          err
        );
        res.status(501).send(deleteTaskMongoErrorResponse.toObject());
        // if the database is able to find the employee by id then update the task
      } else {
        console.log(employee);
        // check which array the item is in
        const todoItem = employee.todo.find(
          (item) => item._id.toString() === req.params.taskId
        );
        const doneItem = employee.done.find(
          (item) => item._id.toString() === req.params.taskId
        );
        // if the item is in the todo array, remove it
        if (todoItem) {
          employee.todo.id(todoItem._id).remove();
          employee.save(function (err, updatedTodoItemEmployee) {
            // if there is an error in the database, return a 500 error
            if (err) {
              console.log(err);
              const deleteTodoItemMongoErrorResponse = new BaseResponse(
                "501",
                "Mongo sever error",
                err
              );
              res.status(501).send(deleteTodoItemMongoErrorResponse.toObject());
              // if the database is able to find the employee by id then update the task
            } else {
              console.log(updatedTodoItemEmployee);
              const deleteTodoItemSuccessResponse = new BaseResponse(
                "200",
                "Item removed from Todo array",
                updatedTodoItemEmployee
              );
              res.status(200).send(deleteTodoItemSuccessResponse.toObject());
            }
          });
          // if the item is in the done array, remove it
        } else if (doneItem) {
          employee.done.id(doneItem._id).remove();
          employee.save(function (err, updatedDoneItemEmployee) {
            // if there is an error in the database, return a 500 error
            if (err) {
              console.log(err);
              const deleteDoneItemMongoErrorResponse = new BaseResponse(
                "501",
                "Mongo sever error",
                err
              );
              res.status(501).send(deleteDoneItemMongoErrorResponse.toObject());
              // if the database is able to find the employee by id then update the task
            } else {
              console.log(updatedDoneItemEmployee);
              const deleteDoneItemSuccessResponse = new BaseResponse(
                "200",
                "Item removed from Done array",
                updatedDoneItemEmployee
              );
              res.status(200).send(deleteDoneItemSuccessResponse.toObject());
            }
          });
          // if the item is not in the todo or done array, return a 404 error
        } else {
          console.log("Invalid taskId: " + req.params.taskId);
          const deleteTaskNotFoundResponse = new BaseResponse(
            "300",
            "Unable to locate the requested resource",
            req.params.taskId
          );
          res.status(300).send(deleteTaskNotFoundResponse.toObject());
        }
      }
    });
    // catch any errors and log them to the console
  } catch (e) {
    console.log(e);
    const deleteTaskServerError = new BaseResponse(
      "500",
      "Internal server error",
      e
    );
    res.status(500).send(deleteTaskServerError.toObject());
  }
});

module.exports = router;
