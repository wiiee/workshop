package com.workshop.domain.entity.project;

import com.wiiee.core.domain.valuetype.DateRange;
import com.wiiee.core.platform.data.BaseData;
import com.workshop.domain.valuetype.TaskInfo;
import org.bson.types.ObjectId;

public class Task extends BaseData<ObjectId> {
    public DateRange DateRange;
    public String ReporterId;
    public String AssigneeId;

    public TaskInfo TaskInfo;

    public Task(ObjectId objectId, com.wiiee.core.domain.valuetype.DateRange dateRange, String reporterId, String assigneeId, TaskInfo taskInfo) {
        super(objectId);
        DateRange = dateRange;
        ReporterId = reporterId;
        AssigneeId = assigneeId;
        TaskInfo = taskInfo;
    }
}
