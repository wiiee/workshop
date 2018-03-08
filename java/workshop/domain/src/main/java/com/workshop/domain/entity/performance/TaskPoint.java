package com.workshop.domain.entity.performance;

import java.time.LocalDateTime;

/**
 * Created by bill.wang on 3/6/18
 */
public class TaskPoint extends MetricPoint {
    public String userId;

    public TaskPoint(LocalDateTime dateTime, int value, String id, String userId) {
        super(dateTime, value, id);
        this.userId = userId;
    }
}
