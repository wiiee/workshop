package com.workshop.app.timesheet;

import java.util.Map;

public class TimeSheet {
    public String Id;

    public String ProjectId;
    public String UserId;

    //String为周一的日期字符串,值为每个Task的时间
    public Map<String, Map<Integer, double[]>> WeekTimeSheets;
}
