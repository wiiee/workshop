package com.workshop.domain.entity.performance;

import java.time.LocalDateTime;

/**
 * Created by bill.wang on 3/6/18
 */
public abstract class Point {
    public LocalDateTime dateTime;
    public int value;

    public Point(LocalDateTime dateTime, int value) {
        this.dateTime = dateTime;
        this.value = value;
    }
}