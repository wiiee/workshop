import { MetricPoint } from './../entity/metric-point';
import { PointList } from './../entity/point-list';
import * as _ from "lodash";

export abstract class EChartUtil {
    private static readonly ONE_DAY_MILLI_SECONDS: number = 86400000;

    static getRange(pointList: PointList, startDate: Date, endDate: Date): PointList {
        let points: MetricPoint[] = pointList.points.filter(o => EChartUtil.isInRange(new Date(o.dateTime), startDate, endDate));

        let total: number = 0;
        let average: number = 0;

        if (points.length !== 0) {
            total = points.map(o => o.value).reduce((prev, current) => prev + current);
            average = Math.round(total / points.length);
        }

        return new PointList(points, total, average);
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
    static getByInterval(pointList: PointList, interval: string): PointList {
        let groups = _.groupBy(pointList.points, interval);
        let keys = Object.keys(groups);

        let points: MetricPoint[] = [];

        keys.forEach(key => {
            let items = <MetricPoint[]>groups[key];
            points.push(new MetricPoint(items[0].id, key, items.map(o => o.value).reduce((prev, current) => prev + current)));
        })

        return new PointList(points, pointList.total, pointList.average);
    }

}