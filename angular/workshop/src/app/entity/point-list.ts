import { MetricPoint } from './metric-point';

export class PointList {
    constructor(
        public points: MetricPoint[] = null,
        public total: number = null,
        public average: number = null
    ) {

    }
}