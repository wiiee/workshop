import { element } from 'protractor';
import { TaskService } from './../../services/task.service';
import { Task } from './../../entity/task';
import { Component, OnInit } from '@angular/core';
import { BaseList } from '../shared/base.list';
import { MatCell } from '@angular/material';
import { QueryList } from '@angular/core/src/render3';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent extends BaseList<Task, TaskService> implements OnInit {
  constructor(taskService: TaskService) {
    super(taskService, ['title', 'description', 'reporterId', 'assigneeId', 'teamId']);
  }

  ngOnInit() {

  }
}
