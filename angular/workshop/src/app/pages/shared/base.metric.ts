import { MatRadioChange } from '@angular/material';
import { TaskMetric } from './../../entity/task-metric';
import { EChartUtil } from '../../util/echart-util';

export abstract class BaseMetric {
    option1: any;
    option2: any;
    option3: any;
    option4: any;

    intervals: any;
    interval: string;

    startDate: Date;
    endDate: Date;

    source: TaskMetric;
    data: TaskMetric;

    phasesData: any[];
    phases: string[];
    phase: number;

    constructor() {
        this.interval = "all";
        this.phase = 0;

        this.intervals = [
            { key: "All", value: "all" },
            { key: "Daily", value: "day" },
            { key: "Weekly", value: "week" },
            { key: "Monthly", value: "month" },
            { key: "Yearly", value: "year" }
        ];
    }

    initData(res: TaskMetric): void {
        this.source = res;
        this.rebuildData();
        console.log(res);
    }

    calculate(): void {
        this.rebuildData();
    }

    private rebuildData(): void {
        this.data = EChartUtil.getRange(this.source, this.startDate, this.endDate);

        if (this.interval !== "all") {
            this.data = EChartUtil.getByInterval(this.data, this.interval);
        }

        this.phasesData = EChartUtil.getPhasesLineData(this.data);
        this.phases = EChartUtil.getPhaseNames(this.data);

        this.setOptions();
    }

    private setOptions(): void {
        this.setOption1();
        this.setOption2();
        this.setOption3();
        this.setOption4();
    }

    private setOption1(): void {
        let title_workload = 'Workload -> Length: ' + this.data.points.length
            + ' | Average: ' + this.data.average
            + ' | Total: ' + this.data.total;

        this.option1 = {
            title: {
                left: 'center',
                text: title_workload,
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: this.data.points.map(o => o.dateTime)
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.data.points.map(o => o.value),
                type: 'line',
                smooth: true
            }]
        };
    }

    private setOption2(): void {
        let pieData = EChartUtil.getPieData(this.data);

        this.option2 = {
            title: {
                text: "Phases",
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                x: 'right',
                data: pieData.map(o => o.name)
            },
            series: [
                {
                    name: 'Phase',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: pieData
                }
            ]
        };
    }

    private setOption3(): void {
        this.option3 = {
            title: {
                left: 'center',
                text: 'Phases - Total',
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: this.data.points.map(o => o.dateTime)
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.data.points.map(o => o.duration),
                type: 'line',
                smooth: true
            }]
        };
    }

    private setOption4(): void {
        this.option4 = {
            title: {
                left: 'center',
                text: 'Phases',
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: this.data.points.map(o => o.dateTime)
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.phasesData[this.phase],
                type: 'line',
                smooth: true
            }]
        };
    }

    changePhase(event: MatRadioChange): void {
        this.phase = event.value;
        this.setOption4();
    }
}