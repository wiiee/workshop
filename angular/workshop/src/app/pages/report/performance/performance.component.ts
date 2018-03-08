import { PointList } from './../../../entity/point-list';
import { MetricService } from './../../../services/metric.service';
import { Component, OnInit } from '@angular/core';
import { EChartUtil } from '../../../util/echart-util';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit {
  option: any

  intervals: any;
  interval: string;

  startDate: Date;
  endDate: Date;

  pointList: PointList;

  constructor(private metricService: MetricService) { }

  ngOnInit() {
    this.metricService.getByUserId("G1").subscribe(res => {
      this.pointList = res;
      console.log(res);
      this.option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.pointList.points.map(o => o.dateTime)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: this.pointList.points.map(o => o.value)
          }
        ]
      };
    });

    this.interval = "all";

    this.intervals = [
      { key: "All", value: "all" },
      { key: "Daily", value: "day" },
      { key: "Weekly", value: "week" },
      { key: "Monthly", value: "month" },
      { key: "Yearly", value: "year" }
    ];
  }

  calculate(): void {
    let range = EChartUtil.getRange(this.pointList, this.startDate, this.endDate);
    let rangePointList = range;

    if (this.interval !== "all") {
      rangePointList = EChartUtil.getByInterval(range, this.interval);
    }

    this.option = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: rangePointList.points.map(o => o.dateTime)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'line',
          smooth: true,
          data: rangePointList.points.map(o => o.value)
        }
      ]
    };
  }
}
