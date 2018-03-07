package com.workshop.domain.entity.performance;

/**
 * Created by bill.wang on 3/6/18
 */
public abstract class Point {
    public long timeStamp;
    public int value;

    public Point(long timeStamp, int value) {
        this.timeStamp = timeStamp;
        this.value = value;
    }
}