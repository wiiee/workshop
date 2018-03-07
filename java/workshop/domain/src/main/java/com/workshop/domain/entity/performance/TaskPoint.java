package com.workshop.domain.entity.performance;

/**
 * Created by bill.wang on 3/6/18
 */
public class TaskPoint extends MetricPoint {
    public String userId;

    public TaskPoint(long timeStamp, int value, String id, String userId) {
        super(timeStamp, value, id);
        this.userId = userId;
    }
}
