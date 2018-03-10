import { ActivatedRoute } from '@angular/router';
import { TaskMetric } from './../../../entity/task-metric';
import { MetricService } from './../../../services/metric.service';
import { Component, OnInit } from '@angular/core';
import { BaseMetric } from '../../shared/base.metric';

@Component({
  selector: 'app-performance-team',
  templateUrl: './performance-team.component.html',
  styleUrls: ['./performance-team.component.css']
})
export class PerformanceTeamComponent extends BaseMetric implements OnInit {
  users: Map<string, TaskMetric>;

  constructor(
    private route: ActivatedRoute,
    private metricService: MetricService) {
      super();
    this.route.queryParamMap.subscribe(params => {
      console.log("params: " + params);
      let teamId = this.route.snapshot.paramMap.get('id');
      this.metricService.getByTeamId(teamId).subscribe(res => {
        this.initData(res);
      });
    });
  }

  ngOnInit() {

  }
}

