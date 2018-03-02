import { SprintService } from './../../services/sprint.service';
import { Sprint } from './../../entity/sprint';
import { Component, OnInit } from '@angular/core';
import { BaseList } from '../shared/base.list';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent extends BaseList<Sprint, SprintService> implements OnInit {
  constructor(sprintService: SprintService) {
    super(sprintService, ['id', 'name']);
  }

  ngOnInit() {
  }
}