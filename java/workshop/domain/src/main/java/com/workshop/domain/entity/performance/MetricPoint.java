package com.workshop.domain.entity.performance;

/**
 * Created by bill.wang on 3/7/18
 */
public abstract class MetricPoint extends Point {
    public String id;

    public MetricPoint(long timeStamp, int value, String id) {
        super(timeStamp, value);
        this.id = id;
    }
}
