import { TaskMetricPoint } from './task-metric-point';

export class TaskMetric {
    constructor(
        public points: TaskMetricPoint[] = null,
        public total: number = null,
        public average: number = null
    ) {

    }
}