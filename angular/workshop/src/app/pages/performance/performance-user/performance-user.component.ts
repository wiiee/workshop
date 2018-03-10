import { ActivatedRoute } from '@angular/router';
import { MetricService } from './../../../services/metric.service';
import { Component, OnInit } from '@angular/core';
import { BaseMetric } from '../../shared/base.metric';

@Component({
  selector: 'app-performance-user',
  templateUrl: './performance-user.component.html',
  styleUrls: ['./performance-user.component.css']
})
export class PerformanceUserComponent extends BaseMetric implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private metricService: MetricService) {
    super();
    this.route.queryParamMap.subscribe(params => {
      console.log("params: " + params);
      let userId = this.route.snapshot.paramMap.get('id');
      this.metricService.getByUserId(userId).subscribe(res => {
        this.initData(res);
      });
    });
  }

  ngOnInit() {

  }
}
