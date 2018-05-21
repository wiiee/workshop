package com.workshop.app.timesheet;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class TProject {
    public String Id;
    public String WorkShopId;
    public String Name;
    public String Description;
    public String SerialNumber; //cp4 project number
    public String ProjectManagerName;

    //计划开始结束日期
    public DateRange PlanDateRange;
    //实际开始结束日期
    public DateRange ActualDateRange;

    //原始结束日期（发布日期）
    public LocalDateTime PlanEndDate;

    //发布日期
    public LocalDateTime PublishDate;

    //计划时间
    public Map<String, Double> PlanHours;
    //实际时间
    public Map<String, Double> ActualHours;

    public String Comment;

    public boolean IsPublic;

    public int Status;

    public int Level;

    //项目是否被Review过
    public boolean IsReviewed;

    //父项目的Id
    public String GroupId;

    //是否bug fix或者Cr
    public boolean IsCr;

    public Set<String> OwnerIds;

    //用户
    public Set<String> UserIds;

    public List<TTask> Tasks;

    //计划送测开始结束日期
    public LocalDateTime PlanTestDate;
    //实际测试开始结束日期
}
