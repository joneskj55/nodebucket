/*
============================================
; Title:  task.service.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 25 Aug 2021
; Description: Task service file
;===========================================
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  /**
   * findAllTasks API calls the Node.js server URL /api/employees/:empId/tasks
   * @param empId
   * @returns 501 MongoDB Exception; 500 Server Exception; employee document with assigned task objects.
   */
  findAllTasks(empId: number): Observable<any> {
    return this.http.get('/api/employees/' + empId + '/tasks');
  }

  /** @param empId
   * @param task
   */
  createTask(empId: number, task: string): Observable<any> {
    return this.http.post('/api/employees/' + empId + '/tasks', {
      text: task,
    });
  }

  // update task through the api to the database and return the updated list
  updateTask(empId: number, todo: Item[], done: Item[]): Observable<any> {
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done,
    });
  }

  // delete task through the api to the database and return the updated list
  deleteTask(empId: number, taskId: string): Observable<any> {
    return this.http.delete('/api/employees/' + empId + '/tasks/' + taskId);
  }
}
