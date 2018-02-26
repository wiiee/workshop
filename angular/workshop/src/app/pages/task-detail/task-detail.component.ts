import { Task } from './../../entity/task';
import { TaskService } from './../../services/task.service';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: Task;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private taskService: TaskService) { }

  ngOnInit() {
  }
}
