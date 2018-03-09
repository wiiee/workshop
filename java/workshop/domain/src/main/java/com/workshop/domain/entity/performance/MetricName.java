package com.workshop.domain.entity.performance;

/**
 * Created by bill.wang on 3/6/18
 */
public enum MetricName {
    //任务相关的监控
    Task("metric.task");

    private String value;

    MetricName(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }
}
