import { Pair } from './../entity/pair';
import { TaskMetricPoint } from './../entity/task-metric-point';
import { TaskMetric } from './../entity/task-metric';
import * as _ from "lodash";

export abstract class EChartUtil {
    private static readonly ONE_DAY_MILLI_SECONDS: number = 86400000;

    static getRange(metric: TaskMetric, startDate: Date, endDate: Date): TaskMetric {
        let points: TaskMetricPoint[] = metric.points.filter(o => EChartUtil.isInRange(new Date(o.dateTime), startDate, endDate));

        let total: number = 0;
        let average: number = 0;

        if (points.length !== 0) {
            total = points.map(o => o.value).reduce((prev, current) => prev + current);
            average = Math.round(total / points.length);
        }

        return new TaskMetric(points, total, average);
    }

    private static isInRange(date: Date, startDate: Date, endDate: Date): boolean {
        if (startDate && endDate)
            return date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime() + this.ONE_DAY_MILLI_SECONDS;

        if (startDate) {
            return date.getTime() >= startDate.getTime();
        }

        if (endDate) {
            return date.getTime() <= endDate.getTime() + this.ONE_DAY_MILLI_SECONDS;
        }

        return true;
    }

    //获取Daily, weekly, monthly, yearly
    static getByInterval(metric: TaskMetric, interval: string): TaskMetric {
        let groups = _.groupBy(metric.points, interval);
        let points: TaskMetricPoint[] = [];

        for (let key in groups) {
            let items = <TaskMetricPoint[]>groups[key];
            points.push(new TaskMetricPoint(null, key, 
                items.map(o => o.value).reduce((prev, current) => prev + current),
                items.map(o => o.duration).reduce((prev, current) => prev + current),
                null, null, null, null,
                this.getPhases(items.map(o => o.phases))
            ));
        }

        return new TaskMetric(points, metric.total, Math.round(metric.total / points.length), );
    }

    private static getPhases(data: Array<Pair<string, number>[]>): Pair<string, number>[]{
        let phases = data.reduce((prev, current) => prev.concat(current));
        let groups = _.groupBy(phases, 'key');
        let result = [];

        for (let key in groups) {
            let total = groups[key].map(o => o.value).reduce((prev, current) => prev + current);
            result.push({
                key: key,
                value: Math.round(total / data.length)
            })
        }

        return result;
    }

    static getPieData(metric: TaskMetric) {
        let phases = metric.points.map(o => o.phases).reduce((prev, current) => prev.concat(current));

        let groups = _.groupBy(phases, 'key');
        let result = [];

        for (let key in groups) {
            result.push({
                name: key,
                value: groups[key].map(o => o.value).reduce((prev, current) => prev + current)
            })
        }

        return result;
    }

    static getPhasesLineData(metric: TaskMetric) {
        let phases = metric.points.map(o => o.phases).reduce((prev, current) => prev.concat(current));

        let groups = _.groupBy(phases, 'key');
        let result = [];

        for(let key in groups){
            result.push(groups[key]);
        }

        return result;
    }

    static getPhaseNames(metric: TaskMetric): string[] {
        let phases = metric.points.map(o => o.phases).reduce((prev, current) => prev.concat(current));
        let groups = _.groupBy(phases, 'key');
        return Object.keys(groups);
    }
}