package com.workshop.domain.entity.performance;

import java.time.LocalDateTime;
import java.time.temporal.WeekFields;
import java.util.Locale;

/**
 * Created by bill.wang on 3/7/18
 */
public abstract class MetricPoint extends Point {
    public String id;

    public String day;
    public String week;
    public String month;
    public String year;

    public MetricPoint(LocalDateTime dateTime, int value, String id) {
        super(dateTime, value);
        this.id = id;

        this.day = String.format("%d.%d.%d", dateTime.getYear(), dateTime.getMonthValue(), dateTime.getDayOfMonth());

        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        this.week = String.format("%d.%d", dateTime.getYear(), dateTime.get(weekFields.weekOfWeekBasedYear()));

        this.month = String.format("%d.%d", dateTime.getYear(), dateTime.getMonthValue());
        this.year = String.valueOf(dateTime.getYear());
    }
}