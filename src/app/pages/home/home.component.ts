/*
============================================
; Title:  home.component.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 25 Aug 2021
; Description: Home component TS file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee.interface';
import { Item } from '../../shared/models/item.interface';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from './../../shared/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './../../shared/create-task-dialog/create-task-dialog.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  employee: Employee;
  todo: Item[];
  done: Item[];
  empId: number;

  // Inject the task service, cookie service, and dialog service
  constructor(
    private taskService: TaskService,
    private cookieService: CookieService,
    private dialog: MatDialog
  ) {
    this.empId = parseInt(this.cookieService.get('session_user'));

    // make call to task service findAllTasks
    this.taskService.findAllTasks(this.empId).subscribe(
      (res) => {
        console.log('--Server response from findAllTasks API --');
        console.log(res);
        // set the todo and done arrays to the server response
        this.employee = res;
        console.log('-- Employee Object');
        console.log(this.employee);
      },
      // error handling
      (err) => {
        console.log('--Server error--');
        console.log(err);
      },
      () => {
        // set the todo and done arrays to the server response
        console.log('--onComplete of the findAllTasks service call--');
        this.todo = this.employee.todo;
        this.done = this.employee.done;

        console.log('--To do tasks--');
        console.log(this.todo);

        console.log('--Done tasks--');
        console.log(this.done);
      }
    );
  }

  ngOnInit(): void {}

  // open the dialog to create a new task
  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true,
    });

    // when the dialog is closed, make a call to the task service to create a new task
    dialogRef.afterClosed().subscribe((data) => {
      // if the user clicked the create task button
      if (data) {
        // make a call to the task service to create a new task
        this.taskService.createTask(this.empId, data.text).subscribe(
          // if the server response is successful
          (res) => {
            // set the todo and done arrays to the server response
            this.employee = res;
          },
          // if the server response is not successful
          (err) => {
            console.log('--onError of the createTask service call--');
            // log the error
            console.log(err);
          },
          // if the server response is successful
          () => {
            // set the todo and done arrays to the server response
            this.todo = this.employee.todo;
            this.done = this.employee.done;
          }
        );
      }
    });
  }

  // drop function for the todo list
  drop(event: CdkDragDrop<any[]>) {
    // if the item is dropped in the todo list
    if (event.previousContainer === event.container) {
      // move the item in the todo list to the done list and update the task list in the database
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log('Reordered the existing list of task items.');

      // update the task list in the database with the new order of the todo list
      this.updateTaskList(this.empId, this.todo, this.done);
      // if the item is dropped in the done list
    } else {
      // move the item in the done list to the todo list and update the task list in the database
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log('Moved task item into the other container');
      // update the task list in the database with the new order of the done list
      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  // delete function for the list
  deleteTask(taskId: string): void {
    // confirm the user wants to delete the task
    if (confirm('Are you sure you want to delete this task?')) {
      // make a call to the task service to delete the task
      if (taskId) {
        console.log(`Task item: ${taskId} was deleted`);

        this.taskService.deleteTask(this.empId, taskId).subscribe(
          // if the server response is successful
          (res) => {
            // set the todo and done arrays to the server response
            this.employee = res.data;
          },
          // if the server response is not successful
          (err) => {
            // log the error
            console.log(err);
          },
          () => {
            // set the todo and done arrays to the server response
            this.todo = this.employee.todo;
            this.done = this.employee.done;
          }
        );
      }
    }
  }

  // update function for the task list
  private updateTaskList(empId: number, dodo: Item[], done: Item[]): void {
    // make a call to the task service to update the task list
    this.taskService.updateTask(this.empId, this.todo, this.done).subscribe(
      // if the server response is successful
      (res) => {
        // set the todo and done arrays to the server response
        this.employee = res.data;
      },
      // if the server response is not successful
      (err) => {
        // log the error
        console.log(err);
      },
      () => {
        // set the todo and done arrays to the server response
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      }
    );
  }
}
