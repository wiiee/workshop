package com.workshop.domain.entity.performance;

import java.time.LocalDateTime;
import java.time.temporal.WeekFields;
import java.util.Locale;

/**
 * Created by bill.wang on 3/6/18
 */
public abstract class Point {
    public String id;

    public LocalDateTime dateTime;
    public int value;

    public Point(LocalDateTime dateTime, int value, String id) {
        this.dateTime = dateTime;
        this.value = value;
        this.id = id;
    }

    public String getDay(){
        return String.format("%d.%d.%d", dateTime.getYear(), dateTime.getMonthValue(), dateTime.getDayOfMonth());
    }

    public String getWeek(){
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        return String.format("%d.%d", dateTime.getYear(), dateTime.get(weekFields.weekOfWeekBasedYear()));
    }

    public String getMonth(){
        return String.format("%d.%d", dateTime.getYear(), dateTime.getMonthValue());
    }

    public String getYear(){
        return String.valueOf(dateTime.getYear());
    }
}