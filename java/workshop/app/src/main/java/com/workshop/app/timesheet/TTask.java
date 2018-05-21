package com.workshop.app.timesheet;

import java.util.Map;

public class TTask {
    public int Id;

    public String Name;

    public String Description;

    public String UserId;

    public double PlanHour;

    public double ActualHour;

    public int Phase;

    public DateRange PlanDateRange;
    public DateRange ActualDateRange;

    public int Status;

    public String CodeReview;
    public Map<String, Integer> Values;

    public boolean IsReviewed;
}
